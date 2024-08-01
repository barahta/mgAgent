import React, { useEffect, useState } from 'react';
import style from './FirstenterStyle.module.scss'

const FirstEnter = ({firstname, secondname, setFirstname, setSecondname}) => {


    const [open, setOpen] = useState(false)
    const [nonactive, setnonactive] = useState(false)
    const [opacity, setOpacity] = useState(false)

    const handlerFirstname = (name) => {
        setFirstname(name)
        localStorage.setItem('firstname', name);
    }

    const handlerSecondname = (name) => {
        setSecondname(name)
        localStorage.setItem('secondname', name);
    }

    const startChat = () => {
        if(firstname !== '' && secondname !== ''){
            setOpacity(true)
            setTimeout(()=>{
                setOpen(true)
            }, 500)

        }else{
            setnonactive(!nonactive)
        }
    }

    useEffect(()=>{
        const getfirstname = localStorage.getItem('firstname');
        const getsecondname = localStorage.getItem('secondname');
        if(getfirstname && getsecondname){
            setOpen(true)
            setFirstname(getfirstname)
            setSecondname(getsecondname)
        }
    }, [])


    return (
        <div className={`${style.firstenter} ${(opacity)?style.opacitystart:''}`} style={(open)?{display: 'none'}:{display: 'flex'} }>

            <div className={style.entermodal}>
                <div className={style.title}>graff.test</div>
                <div className={style.form}>
                    <div className={style.welcome}>Укажите ваше Имя и Фамилию, после чего нажмите START</div>
                    <input type="text" className={(nonactive)?style.nonactive:''} placeholder="Введите имя" onChange={(e)=>handlerFirstname(e.target.value)}/>
                    <input type="text" className={(nonactive)?style.nonactive:''} placeholder="Введите Фамилию" onChange={(e)=>handlerSecondname(e.target.value)}/>
                    <div className={style.btn} onClick={startChat}>START</div>
                </div>
            </div>
        </div>
    );
};

export default FirstEnter;