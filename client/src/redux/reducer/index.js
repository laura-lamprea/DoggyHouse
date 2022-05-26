const initialState = {
    dogs: [],
    dog: {},
    tempers: [],
    dogscopy: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogscopy: action.payload
            }
        case 'GET_DOG':
            return {
                ...state,
                dog: action.payload
            }

        case 'GET_DOG_NAME':
            // console.log(action.payload.err)
            return {
                ...state,
                dogs: action.payload.err ? [{ Error: 'No dogs found' }] : action.payload
            }

        case 'CREATE_DOG':
            return {
                ...state,
            }

        case 'GET_TEMPERS':
            return {
                ...state,
                tempers: action.payload
            }

        // case 'DELETE_DOG':
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         dog: action.payload
        //     }

        case 'ORDER_ALFA':
            const alldogs = state.dogs
            const dogsOrderAlfa = action.payload === 'asc' ?
                alldogs.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                : alldogs.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            return {
                ...state,
                dogs: dogsOrderAlfa
            }
        case 'ORDER_WEIGHT':
            const dogsAll = state.dogs
            const dogOrderWeight = action.payload === 'asc' ?
                dogsAll.sort((a, b) => (a.weight > b.weight ? 1 : a.weight < b.weight ? -1 : 0))
                : dogsAll.sort((a, b) => (a.weight > b.weight ? -1 : a.weight < b.weight ? 1 : 0))
            return {
                ...state,
                dogs: dogOrderWeight
            }

        case 'FILTER_CREATED':
            const dogs = state.dogscopy
            const dogFilteredCreated = action.payload === "created" ? dogs.filter(e => e.created_db) :
            dogs.filter(e => !e.created_db)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.dogscopy
                    : dogFilteredCreated.length ? dogFilteredCreated : [{ Error: 'No videodogs found' }]
            }

        case 'FILTER_BY_TEMPER':
            const allTempers = state.dogscopy
            let filteredByTempers = []
            if (action.payload === "all") {
                filteredByTempers = allTempers
            } else {
                let filteredTemperApi = allTempers.filter((e) => e.tempers?.includes(action.payload))
                filteredByTempers = [...filteredTemperApi]
            }
            return {
                ...state,
                dogs: filteredByTempers.length ? filteredByTempers : [{ Error: 'No videodogs found' }]
            }
        case 'CLEAN_DETAILS':
            return {
                ...state,
                dog: {}
            }

        default:
            return { ...state }

    };
};

export default rootReducer;