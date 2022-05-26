import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDogId, cleanDetails } from '../../redux/actions';
import D from './Details.module.css';
// import gif from "../../components/gif.gif";

export default function DetailPage() {

    const dispatch = useDispatch();
    const dog = useSelector(state => state.dog)
    const { id } = useParams();

    console.log(id)

    useEffect(() => {
       //dispatch(cleanDetails()) 
        dispatch(getDogId(id))
    }, [dispatch])

    return (
        <div  >
            {
                dog && dog.name?
                    <>
                        <div className={D.containerLeft}>
                            <Link to='/home'>
                                <button >Back</button>
                            </Link>
                            <h1>{dog[0].name}</h1>
                            <img src={dog[0].image} className={D.imgGameId} alt="Wait... " />
                        </div>
                        <div className={D.containerRight}>
                            <div className={D.containerInfo}>
                                <p className={D.letterInfo}> weight {dog[0].weight}</p>
                                <p className={D.titleInfo}>height {dog[0].height} </p>
                            </div>
                        </div>
                    </>
                    : <h3>LOADING.... </h3>
                // <img className={D.gif} src={gif}  alt="Not found" />
                // {dog.tempers?.map(g => <a className={D.item} >{g}</a>)} 

            }
        </div>
    )
};
