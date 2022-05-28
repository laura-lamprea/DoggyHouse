import React from 'react';
import C from './Card.module.css';

export default function Card({ name, image, weight, height, tempers, life }) {

    return (
        <div className={C.card}>
            <div className={C.cardHead}>
                <img className={C.imgDog} src={image} alt=" " />
            </div>
            <div className={C.cardBody}>
                <p >Name: {name}</p>
                {/* <p>{name}</p> */}
                <p>Weight: {weight} Kg</p>
                <p>Height: {height} cm </p>
                <p>Life: {life} </p>
                <p>Temperaments:</p>
                <p>{tempers}</p>
            </div>
        </div>
    )
};
