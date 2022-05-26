import React from 'react';
import { Link } from 'react-router-dom'
import L from './Landing.module.css';

export default function LadingPage() {
    return (
        <div className={L.container}>
          
                <h2>WELCOME TO GAME+</h2>
                <h1>ONLINE GAMING SITE</h1>
                <Link to='/home'>
                    <button>Let's go!</button>
                </Link>
         
        </div>
    )
};

