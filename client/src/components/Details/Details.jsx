import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDogId, cleanDetails } from '../../redux/actions';
import D from './Details.module.css';
import loadingGif from "../Images/gif.gif";
import wImg from "./weight.png";
import hImg from "./height.png";
import lImg from "./life.png";



export default function DetailPage() {

    const dispatch = useDispatch();
    const dog = useSelector(state => state.dog)
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //dispatch(cleanDetails()) 
        dispatch(getDogId(id))
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [dispatch])



    return (
        <div  >
            {
                loading ? <img className={D.loadingGif} src={loadingGif} alt="Loading" /> :
                    <div className={D.container}>
                        <Link to='/home'>
                            <button className={D.backBtn}>Back</button>
                        </Link>
                        <h1>&hearts; {dog[0].name} &hearts;</h1>
                        <div className={D.containerInfo}>
                            <img src={dog[0].image} className={D.imgGameId} alt=" " />
                            <div className={D.containerRight}>
                                <h4>Measures</h4>
                                <div className={D.measures}>
                                    <div className={D.measuresItem}>
                                        <img src={wImg} className={D.measuresIco} alt=" " />
                                        <p className={D.letterInfo}>{dog[0].weight} Kg</p>
                                    </div>
                                    <div className={D.measuresItem}>
                                        <img src={hImg} className={D.measuresIco} alt=" " />
                                        <p className={D.titleInfo}>{dog[0].height} cm</p>
                                    </div>
                                    <div className={D.measuresItem}>
                                        <img src={lImg} className={D.measuresIco} alt=" " />
                                        <p className={D.titleInfo}>{dog[0].life} </p>
                                    </div>
                                </div>
                                <h4>Description</h4>
                                <p>{dog[0]. name} is a canine breed that has a cheerful {dog[0].tempers} mood. 
                                Its average weight is between {dog[0].weight} Kg with a height of {dog[0].height} cm. 
                                It also has an average life between {dog[0].life}. 
                                This breed is a wonderful family pet, you'll not regret adopting one!</p>
                            </div>
                        </div>
                    </div>
                // {dog.tempers?.map(g => <a className={D.item} >{g}</a>)} 

            }
        </div>
    )
};
