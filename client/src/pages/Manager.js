import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import style from './Manager.module.scss'
import FormMess from "../components/formmess/FormMess";
import MessLine from "../components/message/MessLine";
import '../assets/styles/index.scss'
import Slider from "../components/slider/Slider";
import Persona from "../components/chats/Persona";
const socket = io('http://localhost:5000');

const Manager = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [thisChat, setThisChat] = useState(null);
    const [list, setList] = useState([]);

    const makeList = (currentChat, messages) => {
        if (currentChat) {
            const searchChat = allChats.find(chat => chat.user === currentChat);
            if (searchChat) {
                const newList = messages.filter(mess => mess.user === currentChat || mess.to === currentChat);
                setList(newList);
            }
        }
    };

    const makeChats = (messages) => {
        const authors = [];
        const newAllChats = [];

        messages.forEach(mess => {
            if (mess.user && !authors.includes(mess.user)) {
                authors.push(mess.user);
                newAllChats.push({ user: mess.user, chats: [] });
            }
        });

        newAllChats.forEach(chat => {
            messages.forEach(mess => {
                if (mess.user === chat.user || mess.to === chat.user) {
                    chat.chats.push(mess);
                }
            });
        });

        setAllChats(newAllChats);
    };

    const sendMessage = () => {
        if (thisChat) {
            const managerMess = { user: false, mess: message, to: thisChat };
            socket.emit('message', managerMess);
            setMessage('');
        }
    };

    useEffect(() => {
        const allMess = JSON.parse(localStorage.getItem('managerMess')) || [];
        setMessages(allMess);

        socket.on('message', (message) => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, message];
                localStorage.setItem('managerMess', JSON.stringify(newMessages));
                return newMessages;
            });
        });

        return () => {
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        makeChats(messages);
    }, [messages]);

    useEffect(() => {
        makeList(thisChat, messages);
    }, [thisChat, messages]);


    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.logo}>graff.test </div>
            </div>
            <div className={style.workpage}>

                <div className={`${style.chatpath} ${style.whitecolor}`}>
                    <div className={style.chatpath_listmess}>
                        {allChats.map((chat, index)=>(
                            <Persona key={index} chat={chat} setThisChat={setThisChat} thisChat={thisChat}/>
                        ))}

                    </div>

                </div>
                <div className={style.personal}>
                    <div className={style.personalchat}>
                        {list.map((mess, index)=>(
                            <MessLine key={index} mess={mess}/>
                        ))}

                    </div>
                    <FormMess message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
            </div>

        </div>

    );
};

export default Manager;