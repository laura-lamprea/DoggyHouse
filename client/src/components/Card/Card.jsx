import React from 'react';
import C from './Card.module.css';

export default function Card({ name, image, weight, height, tempers }) {

    return (
        <div className={C.card}>

            <div className={C.cardHead}>
                <img className={C.imgDog} src={image} alt=" " />
            </div>
            <div className={C.cardBody}>
                <h4>{name}</h4>
                <h4>weight {weight}</h4>
                <h4>height {height}</h4>
                <h6>{tempers}</h6>
            </div>
        </div>
    )
};
