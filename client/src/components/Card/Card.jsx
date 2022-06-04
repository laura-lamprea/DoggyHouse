import React from 'react';
import C from './Card.module.css';

export default function Card({ name, image, weight, height, tempers, life }) {

    return (
        <div className={C.card}>
            <div className={C.details}>Details ›</div>
            <img className={C.imgDog} src={image} alt=" " />
            <div className={C.cardBodyRight}>
                <h5>{name}</h5>
                <h6>W: {weight} Kg</h6>
                <h6>H: {height} cm </h6>
                {/* <h6>Life: {life} </h6> */}
                <h6>Temperaments:</h6>
                <h6>{tempers}</h6>
            </div>

        </div>
    )
};
