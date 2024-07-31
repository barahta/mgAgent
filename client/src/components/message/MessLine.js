import React, { useEffect, useState } from 'react';
import style from './MessStyle.module.scss'

const MessLine = ({mess}) => {

    return (
        <div className={style.line}>
            <div className={style.line_left}>
                <div className={style.sphere}>ФИ</div>
                <div className={style.cloud}>
                    <div className={style.cloud_main}></div>
                    <div className={style.cloud_corner}></div>
                </div>

            </div>
            <div className={style.line_right}>Информативное сообщение с просьбой, в две строки</div>
        </div>
    );
};

export default MessLine;