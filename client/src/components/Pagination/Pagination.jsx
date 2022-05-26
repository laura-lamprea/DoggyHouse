import React from 'react';
import P from './Pagination.module.css';


export default function Pagination ({page, allDogs, perPage}) {
    const numPages = []

    for (let i = 1; i <=Math.ceil(allDogs/perPage); i++) {
        numPages.push(i)
        }
    return (
        <nav>
                { numPages &&
                numPages.map(num => 
                    (
                    <button className={P.btnPg} onClick={() => page(num)} >{num}</button>
                    )
                )}
        </nav>
    )
}