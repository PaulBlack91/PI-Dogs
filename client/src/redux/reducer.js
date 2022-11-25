import { CLEAN, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, GET_DOGS, GET_DOGS_BY_NAME, GET_DOG_BY_ID, GET_TEMPERAMENTS } from "./actions";


const initialState = {
    dogs: [],
    temperament: [],
    details: {},
    filterDogs: [],
    filtro1: [],
    filtro2: []

}




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS: return {
            ...state,
            dogs: action.payload,
            filterDogs: action.payload,
            filtro1: action.payload,
            filtro2: action.payload
        }

        case GET_TEMPERAMENTS: return {
            ...state,
            temperament: action.payload,


        }
        case GET_DOGS_BY_NAME:
            console.log(action.payload);

            return {
                ...state,
                dogs: action.payload,
                filtro1: action.payload,
                filtro2: action.payload
            }
        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.filterDogs
            const filterTempDogs = action.payload === "All"
                ? allDogs
                : allDogs.filter((e) => e.temperament?.includes(action.payload))

            // state.filterDogs.filter(e  => {e.temperament?.includes(action.payload)})


            return {
                ...state,
                filtro1: filterTempDogs,

            }
        case GET_DOG_BY_ID:
            return {
                ...state,
                details: action.payload,
            }
        case FILTER_CREATED:
            let inDb = state.filtro2.filter(e => e.createInDb === true)
            let inApi = state.filtro2.filter(e => !e.createInDb)
            let DBandAPI = [...inApi, ...inDb]                       
            return {
                ...state,
                filtro1: action.payload === "created" ? inDb : action.payload === "Api" ? inApi : DBandAPI,


            }

            case 'ORDER_BY_NAME':
            const sortArr = action.payload === 'asc' ?
                [...state.filtro1].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1}
                    return 0;
                }) :
                [...state.filtro1].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                filtro1: sortArr,
                filtro2: sortArr
            }
        case 'ORDER_BY_WEIGHT':
            const sortedWeight = action.payload === 'asc' ?
                [...state.filtro1].sort(function (a, b) {
                    if (a.weightMin === null) { return 0 }
                    if (a.weightMin < b.weightMin) { return 1 }
                    if (b.weightMin < a.weightMin) { return -1 }
                    return 0;
                }) :
                [...state.filtro1].sort(function (a, b) {
                    if (a.weightMin === null) { return 0 }
                    if (a.weightMin < b.weightMin) { return -1; }
                    if (b.weightMin < a.weightMin) { return 1; }
                    return 0;
                })
            return {
                ...state,
                filtro1: sortedWeight,
                filtro2: sortedWeight
            }

            case 'CLEAN' :
                return({
                    ...state,
                    details: {}
                })
                
        default:
            return {
                ...state
            }


    }
    


}



export default rootReducer; 