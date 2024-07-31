import React, { useEffect, useState } from 'react';
import style from './FormStyle.module.scss'

const FormMess = ({messinput, setMessInput}) => {

    return (
        <div className={style.chatpath_form}>
            <input
                type='text'
                className={style.chatpath_form_input}
                placeholder='Написать сообщение...'
                onChange={(e)=>setMessInput(e.target.value)}
            />
            <div
                className={style.chatpath_form_send}
                style={(messinput !== '')?{backgroundImage: `url("/images/systems/send2.png")`}:{backgroundImage: `url("/images/systems/send.png")`}}
            ></div>
        </div>
    );
};

export default FormMess;