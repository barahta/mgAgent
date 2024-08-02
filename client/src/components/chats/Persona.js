import React, { useEffect, useState } from 'react';
import style from './PersonaStyle.module.scss'

const Persona = ({chat, setThisChat, thisChat}) => {

    const cutWidth = text => {
        let newtext = text
        const cut = 36
        if(text.length > cut){
            newtext = text.slice(0, cut) + '...'
        }
        return newtext
    }

    useEffect(()=>{
        console.log(chat)
    })

    return (
        <div className={style.personablock} onClick={()=>setThisChat(chat.user)} style={(thisChat === chat.user)?{backgroundColor: '#B9D7FB'}:{}}>
            <div className={style.sphere}>{(chat.user)&&chat.user.split(' ')[0][0]}{(chat.user)&&chat.user.split(' ')[1][0]}</div>
            <div className={style.content}>
                <div className={style.name}>{chat.user}</div>
                <div className={style.lastmess}>{cutWidth(chat.chats[chat.chats.length - 1].mess)}</div>
            </div>
        </div>
    );
};

export default Persona;