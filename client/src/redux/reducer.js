import { CLEAN, DELETE_DOG, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, GET_DOGS, GET_DOGS_BY_NAME, GET_DOG_BY_ID, GET_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./actions";


const initialState = {
    dogs: [],
    temperament: [],
    details: {},
    filterDogs: [],    

}




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS: return {
            ...state,
            dogs: action.payload,
            filterDogs: action.payload,            
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
                
            }

        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.filterDogs
            const filterTempDogs = action.payload === "All"
                ? allDogs
                : allDogs.filter((e) => e.temperament?.includes(action.payload))
            return {
                ...state,
                dogs: filterTempDogs,
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                details: action.payload,
            }
        case FILTER_CREATED:
                           
            const filtro = state.filterDogs 
            
            var apiDb

            if(action.payload === "created" ){
                apiDb = filtro.filter((e) => (e.createInDb === true))
                return {
                    ...state,
                    dogs: apiDb
                }
            }
            
            if(action.payload === 'Api' ){
                apiDb = filtro.filter((e) => !e.createInDb)
                return {
                    ...state,
                    dogs: apiDb
                }
            }else{
                apiDb = filtro
                return {
                    ...state,
                    dogs: apiDb
                }
            }


            case ORDER_BY_NAME:
            const sortArr = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1}
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
                
            return {
                ...state,
                dogs: sortArr, 
            }
        case ORDER_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.weightMin === null) { return 0 }
                    if (a.weightMin < b.weightMin) { return 1 }
                    if (b.weightMin < a.weightMin) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.weightMin === null) { return 0 }
                    if (a.weightMin < b.weightMin) { return -1; }
                    if (b.weightMin < a.weightMin) { return 1; }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedWeight,
            }
        

            case CLEAN :
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