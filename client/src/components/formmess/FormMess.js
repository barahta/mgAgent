import React, { useEffect, useState } from 'react';
import style from './FormStyle.module.scss'

const FormMess = ({message, setMessage, sendMessage}) => {

    return (
        <div className={style.chatpath_form}>
            <input
                type='text'
                className={style.chatpath_form_input}
                value={message}
                placeholder='Написать сообщение...'
                onChange={(e)=>setMessage(e.target.value)}
            />
            <div
                className={style.chatpath_form_send}
                style={(message !== '')?{backgroundImage: `url("/images/systems/send2.png")`, cursor: 'pointer'}:{backgroundImage: `url("/images/systems/send.png")`}}
                onClick={sendMessage}
            ></div>
        </div>
    );
};

export default FormMess;