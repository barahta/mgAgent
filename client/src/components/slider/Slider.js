import React, { useEffect, useState } from 'react';
import style from './SliderStyle.module.scss'
import {useRef} from "react";
import {logDOM} from "@testing-library/react";


const Slider = () => {
    const [imgslist, setImgslist] = useState([]); // Состояние для списка изображений
    const [next, setNext] = useState(0); // Индекс текущего изображения
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/images`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setImgslist(data.images); // Устанавливаем состояние с массивом изображений
            })
            .catch(error => console.error('Error fetching images:', error));
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
        const newlist = [...imgslist];
        if (direction === 'left') {
            const lastElement = newlist.pop();
            newlist.unshift(lastElement);
            setImgslist(newlist);
        } else if (direction === 'right') {
            const firstElement = newlist.shift();
            newlist.push(firstElement);
            setImgslist(newlist);
        }
    };

    const leftTap = () => {
        if (next === 0) {
            updateImages('left');
            setNext(imgslist.length - 1); // Сброс до конца списка
        } else {
            setNext(prev => prev - 1);
        }
    };

    const rightTap = () => {
        if (next === imgslist.length - 1) {
            updateImages('right');
            setNext(0); // Сброс до начала списка
        } else {
            setNext(prev => prev + 1);
        }
    };
    const handleFileUpload = (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Update the image list after a new image is uploaded
                setImgslist(prevList => [...prevList, data.filePath]);
            })
            .catch(error => console.error('Error uploading image:', error));
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
                <div className={style.upload}>
                    <input type="file" onChange={handleFileUpload} />
                </div>
                <div className={style.btn} onClick={rightTap}>
                    <img src='/images/systems/right.svg' />
                </div>
            </div>
        </div>
    );
};

export default Slider;