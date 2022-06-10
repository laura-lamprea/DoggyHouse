import React, { useState } from 'react';
import P from './Pagination.module.css';

//  fun (nPga)  all     8        nuero de pg currentPage
export default function Pagination({ page, allDogs, perPage, current }) {
    const numPages = []        
    for (let i = 1; i <= Math.ceil(allDogs / perPage); i++) {
        numPages.push(i)
    }

    let numPagesArr = []   // [[1, 2, 3, 4], [5, 6, 7, 8], [9]]
    for (let i = 0; i < Math.ceil(numPages.length / 4); i++) {   //3
        let auxsArr = []
        for (let j = 0; j < 4; j++) {
            const val = j + i * 4
            if (val < numPages.length) auxsArr.push(numPages[val])
        }
        numPagesArr.push(auxsArr)
    }
    // console.log('numPageslenght', numPages.length); //22
    // console.log('numPagesArrlenght', numPagesArr); //6

    const [curr, setCurr] = useState(0);
    const posicion = numPagesArr[curr]
    //console.log('posicion', posicion[0]);
    const next = (e) => {
        setCurr(e)
    };

    function pageNext(curr1, pos) {
        page(pos)
        next(curr1)
        // console.log('numPagesArr[5].length', numPagesArr.length);
        // console.log('curr1', curr1);
    }

    //console.log('numPages', numPages);  //[1, 2, 3, 4, 5, 6, 7, 8, 9....]
    // numPagesArr = []   // [[1, 2, 3, 4], [5, 6, 7, 8], [9]] 

    return (
        <div >
            {curr > 0 && (
                <button className={P.btnPg} onClick={() => pageNext(curr - 1, posicion[0] - 4)} >
                    prev
                </button>
            )}

            {posicion &&
                posicion.map((num) => <button key={num} className={P.btnPg} onClick={() => page(num)}>{num}</button>)
            }

            {  // 5      6     -  1
                curr < numPagesArr.length - 1 ?
                    <button className={P.btnPg} onClick={() => pageNext(curr + 1, posicion[3] + 1)} >next</button>
                    : null
            }

        </div>
    )
}

// {current > 1 && (
//     <button className={P.btnPg} onClick={() => page(current - 1)} >
//         prev
//     </button>
// )}
// <span>{current}</span>
// //<button className={P.btnPg} onClick={() => page(current)} >{current}</button>
// {current !== numPages.at(-1) && (
//     <button className={P.btnPg} onClick={() => page(current + 1)} >
//         next
//     </button>
// )}


// {numPages &&
//     numPages.map(num =>
//     (
//         <button key={num} className={P.btnPg} onClick={() => page(num)} >{num}</button>
//     )
//     )}


// {
//     current > 1 ?
//         <button className={P.btnPg} onClick={() => page(current - 1)} >prev</button>
//         : null
// }
// <button className={P.btnPg} onClick={() => page(current)} >{current}</button>
// {
//     current < allDogs / perPage ?
//         <button className={P.btnPg} onClick={() => page(current + 1)} >next</button>
//         : null
// } 