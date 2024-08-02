import React, { useEffect, useState } from 'react';
import style from './MessStyle.module.scss'

const MessLine = ({mess, index, list, isFirst, isLast }) => {
    let styleblock = {}
    let displaysphere = {}
    let bgcolor = '#B9D7FB'

    if(!mess.user){
        bgcolor = '#E2EAF1'
        displaysphere.backgroundColor = bgcolor
        styleblock.backgroundColor = bgcolor
    }

    if (isFirst) {
        styleblock.borderRadius = '4px 8px 4px 0px'
    }
    if (isLast) {
        styleblock.borderRadius = '4px 4px 8px 0px'
    }
    if (!isLast) {
        displaysphere.display = 'none'
    }

    return (
        <div className={style.line}>
            <div className={style.line_left}>

                <div className={style.cloud} style={displaysphere}>
                    <div className={style.cloud_main} style={displaysphere}></div>
                    <div className={style.cloud_corner}></div>
                </div>
                <div className={style.sphere} style={displaysphere}>{(mess.user)?`${mess.user.split(' ')[0][0]}${mess.user.split(' ')[1][0]}`:'Me'}</div>
            </div>
            <div className={style.line_right} style={styleblock}>{mess.mess}</div>
        </div>
    );
};

export default MessLine;