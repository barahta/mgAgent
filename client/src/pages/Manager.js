import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Manager = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            {/*<h1>Manager Page</h1>*/}
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

export default Manager;