import React, { useState, useEffect } from 'react';
import { createDog, getTempers } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import C from './Create.module.css'

export default function CreateDog() {
    const dispatch = useDispatch()
    const tempers = useSelector(state => state.tempers)
    const [input, setInput] = useState({
        name: '',
        image: '',
        weight: '',
        weightMin: '',
        weightMax: '',
        height: '',
        heightMin: '',
        heightMax: '',
        lifeMin: '',
        lifeMax: '',
        life: '',
        tempers: [],
    });

    const [botonActivo, setBotonActivo] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTempers())
    }, [dispatch])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));


        if (input.name && input.image &&
            input.lifeMin && input.lifeMax &&
            input.weightMin && input.weightMax &&
            input.heightMin && input.heightMax
            // input.platforms.length &&
        ) {
            setBotonActivo(true)
        } else {
            setBotonActivo(false)
        }
    }

    const handleSelectTemper = (e) => {
        setInput({
            ...input,
            tempers: [...new Set([...input.tempers, e.target.value])]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        

        // dispatch(createDog(input))
        // alert("DOG CREATED SUCCESSFULLY!!")

        input.life = `${input.lifeMin} - ${input.lifeMax} years`
        input.weight = `${input.weightMin} - ${input.weightMax} `
        input.height = `${input.heightMin} - ${input.heightMax} `

        console.log('input', input)


        if (Object.entries(errors).length === 0) {
            dispatch(createDog(input))
            alert("DOG CREATED SUCCESSFULLY!!")
            setInput({
                ...input,
                name: '',
                image: '',
                weightMin: '',
                weightMax: '',
                heightMin: '',
                heightMax: '',
                life: '',
                tempers: [],
            });
            setBotonActivo(false)
            document.getElementById("tempers").getElementsByTagName('option')[0].selected = 'selected'
        } else {
            alert('Oops! Failed Creation!! \n Invalid data, please enter the required data!')
            // setBotonActivo(false)
        }
    }

    function handleDeleteTemper(e, deleteTemper) {
        e.preventDefault();
        setInput({
            ...input,
            tempers: input.tempers.filter(tem => tem !== deleteTemper)
        })
    }

    return (
        <div className={C.container}>
            <div>
                <Link to='/home'>
                    <button className={C.btnBack}>&laquo; Back</button>
                </Link>
                <div className={C.containerLeft} >
                    <h5 className={C.welcome}>¡New Dog!</h5>
                    <img className={C.imgNew} src={input.image} />
                </div>
            </div>
            <div className={C.containerRight}>
                <form onSubmit={handleSubmit}  >
                    <div className={C.formItem} >
                        <label >Name</label>
                        <input className={C.inputForm} type="text" value={input.name} name="name" placeholder="The name of dog..." onChange={handleInputChange}
                        />
                        {botonActivo && errors.name && (<h6 className={C.danger}> {errors.name}</h6>)}
                    </div>

                    <div className={C.formItem}>
                        <label>Image</label>
                        <input className={C.inputForm} type="text" value={input.image} name="image" placeholder="https://url-of-image-the-videogame.png" onChange={handleInputChange}
                        />
                        {botonActivo && errors.image && (<h6 className={C.danger}> {errors.image}</h6>)}
                    </div>

                    <div className={C.formItem}>
                        <label>Life: </label>
                        <div className={C.formItem2}>
                            <input className={C.inputRange} type="number" value={input.lifeMin} name="lifeMin" min={0} max={21} placeholder="min" onChange={handleInputChange} />
                            {botonActivo && errors.lifeMin && (<h6 className={C.danger}> {errors.lifeMin} </h6>)}
                            <label> - </label>
                            <input type="number" value={input.lifeMax} name="lifeMax" min={1} max={22} placeholder="max" onChange={handleInputChange} />
                            {botonActivo && errors.lifeMax && (<h6 className={C.danger}>{errors.lifeMax}</h6>)}
                            <label> years </label>
                        </div>
                    </div>

                    <div className={C.formSlice}>
                        <label>Weight: </label>
                        <input type="number" value={input.weightMin} name="weightMin" min={1} max={99} placeholder="min" onChange={handleInputChange} />
                        {botonActivo && errors.weightMin && (<h6 className={C.danger}> {errors.weightMin} </h6>)}
                        <label> - </label>
                        <input type="number" value={input.weightMax} name="weightMax" min={2} max={100} placeholder="max" onChange={handleInputChange} />
                        {botonActivo && errors.weight && (<h6 className={C.danger}> {errors.weight}</h6>)}
                        <label> Kg </label>
                    </div>

                    <div className={C.formSlice}>
                        <label>Height: </label>
                        <input type="number" value={input.heightMin} name="heightMin" min={1} max={99} placeholder="min" onChange={handleInputChange} />
                        {botonActivo && errors.heightMin && (<h6 className={C.danger}> {errors.heightMin} </h6>)}
                        <label> - </label>
                        <input type="number" value={input.heightMax} name="heightMax" min={2} max={100} placeholder="max" onChange={handleInputChange} />
                        {botonActivo && errors.heightMax && (<h6 className={C.danger}> {errors.heightMax}</h6>)}
                        <label> cm </label>
                    </div>

                    <div>
                        <label>Temperaments: </label>
                        <select name="tempers" id="tempers" onChange={(e) => handleSelectTemper(e)}>
                            <option defaultValue={true}>Choose...</option>
                            {tempers.map(g => (
                                <option value={g.name}>{g.name}</option>
                            ))}
                        </select>
                        {input.tempers?.map(selec =>
                            <span>
                                {selec} <button className={C.btnx} onClick={(e) => handleDeleteTemper(e, selec)}>X</button>
                            </span>
                        )}
                        {botonActivo && errors.tempers && (<h6 className={C.danger}> {errors.tempers}</h6>)}
                    </div>

                    <div className={C.btnsub} >
                        <button type="submit" disabled={!botonActivo} className={C.btnAll} id="btn" >CREATE DOG</button>
                    </div>
                </form>

            </div>
        </div >
    );
};

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required!';
    } else if (/[$%&|<>#]/.test(input.name)) {
        errors.name = 'No special characters allowed!';
    } else if (!/^[A-Z]/.test(input.name)) {
        errors.name = 'The first letter must be capitalized!';
    } else if (/[0-9]/.test(input.name)) {
        errors.name = 'Not numbers';
    } else if (/\s/.test(input.name)) {
        errors.name = 'No Spaces';
    }

    if (!input.image) {
        errors.image = 'Url is required!';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errors.image = 'Invalid url';
    } else if (!((input.image).includes('.jpg') || (input.image).includes('.png') || (input.image).includes('.jpeg'))) {
        errors.image = 'It is not an image. Url must include png, jpg or jpeg format';
    }

    if (!input.lifeMin) {
        errors.lifeMin = 'Min value required!';
    } else if (parseInt(input.lifeMin) > parseInt(input.lifeMax)) {
        errors.lifeMin = 'Min value is greater than max!';
    } else if (input.lifeMin == input.lifeMax) {
        errors.lifeMin = 'Min value and max must not be equal!';
    } else if (parseInt(input.lifeMin) < 0) {
        errors.lifeMin = 'Not negative numbers';
    } else if (parseInt(input.lifeMin) > 21) {
        errors.lifeMin = 'Value can be up to 21';
    } else if (/[$%&|<>#]/.test(input.lifeMin)) {
        errors.lifeMin = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.lifeMin)) {
        errors.lifeMin = 'Only numbers, not letters!';
    }

    if (!input.lifeMax) {
        errors.lifeMax = 'Max value required!';
    } else if (parseInt(input.lifeMax) < 1 || parseInt(input.lifeMax) > 22) {
        errors.lifeMax = 'Numbers less than 1 or greater than 22 are not allowed';
    } else if (/[$%&|<>#]/.test(input.lifeMax)) {
        errors.lifeMax = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.lifeMax)) {
        errors.lifeMax = 'Only numbers!!';
    }

    if (!input.weightMin) {
        errors.weightMin = 'Min value required!';
    } else if (parseInt(input.weightMin) > parseInt(input.weightMax)) {
        errors.weightMin = 'Min value is greater than max!';
    } else if (input.weightMin == input.weightMax) {
        errors.weightMin = 'Min value and max must not be equal!';
    } else if (parseInt(input.weightMin) < 1 || parseInt(input.weightMin) > 99) {
        errors.weightMin = 'Value outside the range: 1-99';
    } else if (/[$%&|<>#]/.test(input.weightMin)) {
        errors.weightMin = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.weightMin)) {
        errors.weightMin = 'Only numbers, not letters!';
    }

    if (!input.weightMax) {
        errors.weightMax = 'Max value required!';
    } else if (parseInt(input.weightMax) < 2 || parseInt(input.weightMax) > 100) {
        errors.weightMax = 'Value outside the range: 2-100';
    } else if (/[$%&|<>#]/.test(input.weightMax)) {
        errors.weightMax = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.weightMax)) {
        errors.weightMax = 'Only numbers!!';
    }

    if (!input.heightMin) {
        errors.heightMin = 'Min value required!';
    } else if (parseInt(input.heightMin) > parseInt(input.heightMax)) {
        errors.heightMin = 'Min value is greater than max!';
    } else if (input.heightMin == input.heightMax) {
        errors.heightMin = 'Min value and max must not be equal!';
    } else if (parseInt(input.heightMin) < 1 || parseInt(input.heightMin) > 99) {
        errors.heightMin = 'Value outside the range: 1-99';
    } else if (/[$%&|<>#]/.test(input.heightMin)) {
        errors.heightMin = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.heightMin)) {
        errors.heightMin = 'Only numbers, not letters!';
    }

    if (!input.heightMax) {
        errors.heightMax = 'Max value required!';
    } else if (parseInt(input.heightMax) < 2 || parseInt(input.heightMax) > 100) {
        errors.heightMax = 'Value outside the range: 2-100';
    } else if (/[$%&|<>#]/.test(input.heightMax)) {
        errors.heightMax = 'No special characters allowed!';
    } else if (!/[0-9]/.test(input.heightMax)) {
        errors.heightMax = 'Only numbers!!';
    }

    // if (!input.tempers.length) {
    //     errors.tempers = 'Tempers is required!';
    // }

    return errors;
};



