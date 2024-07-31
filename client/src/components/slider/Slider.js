import React, { useEffect, useState } from 'react';
import style from './SliderStyle.module.scss'
import {useRef} from "react";

const Slider = () => {
    // const initialImgs = [
    //     '/images/slider/2.png',
    //     '/images/slider/3.png',
    //     '/images/slider/4.png',
    //     '/images/slider/5.png',
    //     '/images/slider/6.png',
    //     '/images/slider/7.png',
    //     '/images/slider/8.png'
    // ];

    const [imgslist, setImgslist] = useState([]); // Triple the initial images
    const [next, setNext] = useState(imgslist.length); // Start from the middle set of images
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch('/api/images')
            .then(response => response.json())
            .then(data => {
                setImgslist(data);
            })
            .catch(error => console.error('Error fetching images:', error));
        console.log(imgslist)
    }, []);

    const centerImage = (index) => {
        const slider = sliderRef.current;
        if (slider && slider.childNodes[index]) {
            const imgWidth = slider.childNodes[index].clientWidth;
            const sliderWidth = slider.clientWidth;
            const scrollPos = slider.childNodes[index].offsetLeft - (sliderWidth / 2) + (imgWidth / 2);
            slider.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
        }
    };

    const updateImages = (direction) => {
        if (direction === 'left') {
            const newlist = [...imgslist];
            const lastElement = newlist.pop();
            newlist.unshift(lastElement);
            setImgslist(newlist);
        } else if (direction === 'right') {
            const newlist = [...imgslist];
            const firstElement = newlist.shift();
            newlist.push(firstElement);
            setImgslist(newlist);
        }
    };

    const leftTap = () => {
        if (next === 0) {
            updateImages('left');
            setNext(imgslist.length); // Reset to middle set
        } else {
            setNext(prev => prev - 1);
        }
    };

    const rightTap = () => {
        if (next === imgslist.length - 1) {
            updateImages('right');
            setNext(imgslist.length - 1); // Reset to middle set
        } else {
            setNext(prev => prev + 1);
        }
    };

    useEffect(() => {
        centerImage(next);
    }, [next, imgslist]);

    return (
        <div className={style.slider}>
            <div className={style.scrollbar} id='slider' ref={sliderRef}>
                {imgslist.map((img, index) => (
                    <img key={index} src={img} />
                ))}
            </div>
            <div className={style.buttons}>
                <div className={style.btn} onClick={leftTap}>
                    <img src='/images/systems/left.svg' />
                </div>
                <div className={style.btn} onClick={rightTap}>
                    <img src='/images/systems/right.svg' />
                </div>
            </div>
        </div>
    );
};

export default Slider;