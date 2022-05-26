import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getTempers, getDogName, filterTempers, filterCreated, orderAlfa, orderWeight } from '../../redux/actions'
import Card from '../Card/Card'
//import Navbar from '../Navbar/Navbar'
import H from './Home.module.css';
// import gif from "../../components/gif.gif";

import Pagination from "../Pagination/Pagination"


export default function HomePage() {
    const dispatch = useDispatch()
    const allDogs = useSelector(state => state.dogs)
    const tempers = useSelector(state => state.tempers)

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15)
    const indexLast = currentPage * perPage
    const indexFirst = indexLast - perPage
    const current = allDogs.slice(indexFirst, indexLast)

    const page = (numPage) => {
        setCurrentPage(numPage)
    }

    const [order, setOrder] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTempers())
    }, [dispatch])


    const [searching, setSearching] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDogName(name))
        setSearching(true)
        setName('')
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();
        window.location.reload()
        // document.getElementById("nameSelect").getElementsByTagName('option')[0].selected = 'selected'
        // document.getElementById("weightSelect").getElementsByTagName('option')[0].selected = 'selected'
        // document.getElementById("originSelect").getElementsByTagName('option')[0].selected = 'selected'
        // document.getElementById("temper").getElementsByTagName('option')[0].selected = 'selected'
    }

    function orderAlfaHdl(e) {
        e.preventDefault();
        dispatch(orderAlfa(e.target.value));
        setOrder(e.target.value)
    }
    function orderWeightHdl(e) {
        e.preventDefault();
        dispatch(orderWeight(e.target.value));
        setOrder(e.target.value)
    }
    function filterTemperHdl(e) {
        dispatch(filterTempers(e.target.value));
    }
    function filterCreatedHdl(e) {
        dispatch(filterCreated(e.target.value));
    }

    return (
        <div className={H.container}>
            {/* <Navbar /> */}
            <div className={H.container2}>
                <div className={H.searchBar}>
                    <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Reload Dogs</button>
                    <div className={H.filters} >
                        <select id="nameSelect" onChange={(e) => orderAlfaHdl(e)}>
                            <option >Name</option>
                            <option value='asc'>A-Z</option>
                            <option value='des'>Z-A</option>
                        </select>
                        <select id="weightSelect" onChange={(e) => orderWeightHdl(e)}>
                            <option>Weight</option>
                            <option value='asc'>to the most </option>
                            <option value='des'>to the least </option>
                        </select>
                        <select id="originSelect" onChange={(e) => filterCreatedHdl(e)}>
                            <option >Origin</option>
                            <option value='all'>All</option>
                            <option value='created'>Created</option>
                            <option value='api'>Existing</option>
                        </select>
                        <select name="temper" id="genre" onChange={(e) => filterTemperHdl(e)}>
                            <option >Temperaments</option>
                            <option value='all'>All</option>
                            {tempers.map(g => (
                                <option value={g.name} >{g.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input className={H.inputSearch} value={name} type="search" required name="buscar" autoComplete="off" placeholder=" Search dog..." onChange={(e) => handleInputChange(e)} />
                        <button className={H.btn} type="submit" onClick={(e) => handleSubmit(e)}>BUSCAR</button>
                    </div>
                </div>
            </div>


            <div className={H.pagination}>
                <h3>DOS</h3>
                <Pagination
                    perPage={perPage}
                    allDogs={allDogs.length}
                    page={page}
                />
            </div>

            <nav className={H.cards} >
                {
                    current.length ?
                        current.map(d => {
                            return (
                                // g.Error ? <img className={H.error} src={notFound} alt="Not found" /> :
                                d.Error ? <h3>Not found</h3> :
                                    <div key={d.id}>
                                        <Link to={`/details/${d.id}`} style={{ textDecoration: 'none' }} >
                                            <Card name={d.name}
                                                id={d.id}
                                                image={d.image}
                                                tempers={d.created_db ? d.tempers.map(tem => ` ${tem.name}, `) : d.tempers}
                                                weight={d.weight}
                                                height={d.height}
                                              
                                            />
                                        </Link>
                                    </div>
                            );
                        })
                        : <h3>LOADING</h3>
                    // : <img className={H.loading} src={gif} alt="Not found" />
                }
            </nav>

        </div>
    )
}
