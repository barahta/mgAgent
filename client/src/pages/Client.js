import React, {useEffect, useRef, useState} from 'react';
import style from './Client.module.scss'
import FormMess from "../components/formmess/FormMess";
import MessLine from "../components/message/MessLine";
import '../assets/styles/index.scss'
import Slider from "../components/slider/Slider";
import FirstEnter from "../components/firstenter/FirstEnter";
import socket from '../socket';

const Client = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [firstname, setFirstname] = useState('')
    const [secondname,setSecondname] = useState('')
    const [active, setActive] = useState(false)
    const [list, setList] = useState([])
    const listmessReg = useRef(null)

    const makeList = () => {
        if (firstname) {
            let newlist = messages.filter(mess =>
                mess.user === `${firstname} ${secondname}` || mess.to === `${firstname} ${secondname}`
            )
            setList(newlist);
        }
    }

    useEffect(() => {
        makeList()
    }, [messages, firstname, secondname]);

    const sendMessage = () => {
        if(firstname && message.length>0){
            const userMess = {user: `${firstname} ${secondname}`, mess: message, to: false}
            socket.emit('message', userMess)
            setMessage('')
        }

    };

    useEffect(() => {
        const allMess = JSON.parse(localStorage.getItem('userMess')) || [];
        setMessages(allMess)

        socket.on('message', (message) => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, message]
                localStorage.setItem('userMess', JSON.stringify(newMessages))
                return newMessages
            });
        });

        return () => {
            socket.off('message')
        };
    }, []);

    useEffect(() => {
        if (listmessReg.current) {
            listmessReg.current.scrollTop = listmessReg.current.scrollHeight
        }
    }, [list])
    const groupMessages = (messages) => {
        const grouped = []
        let currentGroup = []
        let currentUser = ''

        messages.forEach((message, index) => {
            if (message.user !== currentUser) {
                if (currentGroup.length > 0) {
                    grouped.push(currentGroup)
                }
                currentGroup = []
                currentUser = message.user
            }
            currentGroup.push(message)
        })
        if (currentGroup.length > 0) {
            grouped.push(currentGroup)
        }

        return grouped
    }

    const groupedList = groupMessages(list)

    return (
        <div className={style.main}>
            <FirstEnter
                firstname={firstname}
                setFirstname={setFirstname}
                secondname={secondname}
                setSecondname={setSecondname}
                setActive={setActive}

                style={(active)?{display: 'none'}:{display: 'flex'}}
            />
            <div className={style.header}>
                <div className={style.logo}>graff.test </div>
                <div>{firstname} {secondname}</div>
            </div>
            <div className={style.workpage}>
                <div className={style.sliderpath}>
                    <Slider />
                </div>
                <div className={style.chatpath}>
                    <div className={style.chatpath_title}>Чат с поддержкой</div>
                    <div className={style.chatpath_listmess} ref={listmessReg}>
                        {groupedList.map((group, groupIndex) => (
                            group.map((mess, index) => {
                                const isFirst = index === 0;
                                const isLast = index === group.length - 1;
                                return (
                                    <MessLine
                                        key={index}
                                        mess={mess}
                                        index={index}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                    />
                                );
                            })
                        ))}
                    </div>
                    <FormMess  message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>

            </div>
        </div>
    );
};

export default Client;