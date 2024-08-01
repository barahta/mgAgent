import React, { useEffect, useState } from 'react';
import style from './MessStyle.module.scss'

const MessLine = ({mess}) => {

    return (
        <div className={style.line}>
            <div className={style.line_left}>
                <div className={style.sphere}>{(mess.user)?`${mess.user.split(' ')[0][0]}${mess.user.split(' ')[1][0]}`:'Я'}</div>
                <div className={style.cloud}>
                    <div className={style.cloud_main}></div>
                    <div className={style.cloud_corner}></div>
                </div>

            </div>
            <div className={style.line_right}>{mess.mess}</div>
        </div>
    );
};

export default MessLine;