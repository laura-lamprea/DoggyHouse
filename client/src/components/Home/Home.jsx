import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getTempers, getDogName, filterTempers, filterCreated, orderAlfa, orderWeight } from '../../redux/actions'
import Card from '../Card/Card'
import Pagination from "../Pagination/Pagination"
import H from './Home.module.css';
import logo from "../Images/logo.png";
import loadingGif from "../Images/gif.gif";
import notFound from "../Images/404.png";



export default function HomePage() {
    const dispatch = useDispatch()
    const allDogs = useSelector(state => state.dogs)
    const tempers = useSelector(state => state.tempers)

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8)
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
            <div className={H.navbar}>
                <Link to={`/`}  >
                    <img src={logo} className={H.logo} alt="logo" />
                </Link>
                <div className={H.navbarButtons}>
                    <button className={H.btnNav} onClick={(e) => { handleClick(e) }}>Reload</button>
                    <div className={H.filters} >
                        <select id="nameSelect" onChange={(e) => orderAlfaHdl(e)}>
                            <option >Breed</option>
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
                                <option key={g.name} value={g.name} >{g.name}</option>
                            ))}
                        </select>
                    </div>
                    <Link to={`/create`}  >
                        <button className={H.btnNav}>CREATE +</button>
                    </Link>
                </div>
            </div>

            {/* <hr></hr> */}
            <div className={H.searchbar}>
                <input className={H.inputSearch} value={name} type="search" required name="buscar" autoComplete="off" placeholder="What breed are you looking for?" onChange={(e) => handleInputChange(e)} />
                <button className={H.btnSubmit} type="submit" onClick={(e) => handleSubmit(e)}>GO!</button>
            </div>



            <nav className={H.cards} >
                {
                    current.length ?
                        current.map(d => {
                            return (
                                d.Error ? <img className={H.notFound} src={notFound} alt="Not found" /> :
                                    <div key={d.id}>
                                        <Link to={`/details/${d.id}`} style={{ textDecoration: 'none' }} >
                                            <Card name={d.name}
                                                id={d.id}
                                                image={d.image}
                                                tempers={d.created_db ? d.tempers.map(tem => ` ${tem.name}, `) : d.tempers}
                                                weight={d.weight}
                                                life={d.life}
                                                height={d.height}
                                            />
                                        </Link>
                                    </div>

                            );
                        })
                        : <img className={H.loadingGif} src={loadingGif} alt="Loading" />
                }
            </nav>
            <div className={H.pagination}>
                <Pagination
                    perPage={perPage}
                    allDogs={allDogs.length}
                    page={page}
                />
            </div>

        </div>
    )
}
