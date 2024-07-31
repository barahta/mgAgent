import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import style from './Client.module.scss'
import FormMess from "../components/formmess/FormMess";
import MessLine from "../components/message/MessLine";
import '../assets/styles/index.scss'
import Slider from "../components/slider/Slider";
const socket = io('http://localhost:5000');

const Client = () => {
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    //
    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages((prevMessages) => [...prevMessages, message]);
    //     });
    // }, []);
    //
    // const sendMessage = () => {
    //     socket.emit('message', message);
    //     setMessage('');
    // };

    /////////////////////////////////////////////////////////////////////

    const [messinput, setMessInput] = useState('')




    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.logo}>graff.test </div>
            </div>
            <div className={style.workpage}>
                <div className={style.sliderpath}>
                    <Slider />
                </div>
                <div className={style.chatpath}>
                    <div className={style.chatpath_title}>Чат с поддержкой</div>
                    <div className={style.chatpath_listmess}>
                        <MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine /><MessLine />
                    </div>
                    <FormMess messinput={messinput} setMessInput={setMessInput} />
                </div>

            </div>
            {/*<h1>Client Page</h1>*/}
            {/*<div>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={message}*/}
            {/*        onChange={(e) => setMessage(e.target.value)}*/}
            {/*    />*/}
            {/*    <button onClick={sendMessage}>Send</button>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {messages.map((msg, index) => (*/}
            {/*        <div key={index}>{msg}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default Client;