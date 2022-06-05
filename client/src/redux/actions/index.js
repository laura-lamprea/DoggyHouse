import axios from 'axios';

export function getAllDogs() {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs`)
        return dispatch({ type: 'GET_ALL_DOGS', payload: json.data })
    }
}

export function getDogId(id) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs/${id}`)
        //console.log('json.data',json.data)
        return dispatch({ type: 'GET_DOG', payload: json.data })
    }
}

export function getDogName(name) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({ type: 'GET_DOG_NAME', payload: json.data })
    }
}

export function createDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload); 
        return response;  
    }
}

export function getTempers() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/temperament');
        return dispatch({ type: 'GET_TEMPERS', payload: response.data })
    }
}


// export function deleteGame(id) {
//     return async function (dispatch) {
//         const json = await axios.delete(`http://localhost:3001/dogs/${id}`)
//         return dispatch({ type: 'DELETE_DOG', payload: json.data })
//     }
// }

export function filterTempers(payload) {
    return {
        type: 'FILTER_BY_TEMPER',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderAlfa(payload) {
    return {
        type: 'ORDER_ALFA',
        payload
    }
}

export function orderWeight(payload) {
    return {
        type: 'ORDER_WEIGHT',
        payload
    }
}

export function cleanDetails(payload) {
    return {
        type: 'CLEAN_DETAILS',
        payload
    }
}