import React, { useEffect, useState } from 'react';
import style from './SliderStyle.module.scss'

const Slider = () => {

    return (
        <div className={style.slider}>
            <div className={style.scrollbar}></div>
            <div className={style.buttons}>
                <div className={style.btn}><img src='/images/systems/left.svg' /> </div>
                <div className={style.btn}><img src='/images/systems/right.svg' /></div>
            </div>
        </div>
    );
};

export default Slider;