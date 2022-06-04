import React from 'react';
import { Link } from 'react-router-dom'
import L from './Landing.module.css';

export default function LadingPage() {
    return (
        <div className={L.container}>
            <div className={L.containerInfo}>
                <h2>Welcome to</h2>
                <h1>Doggy House</h1>
                <Link to='/home'>
                    <button className={L.button}>
                        Let's see doggies!
                        <div className={L.button__horizontal} ></div>
                        <div className={L.button__vertical} ></div>
                    </button>
                </Link>

            </div>
        </div>
    )
};

