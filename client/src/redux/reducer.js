import { GET_DOGS, GET_DOGS_BY_NAME, GET_TEMPERAMENTS } from "./actions";


const initialState = {
    dogs: [],
    temperament: [],
    details: [],

}



const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS: return {
            ...state,
            dogs: action.payload
        }

        case GET_TEMPERAMENTS: return {
            ...state,
            temperament: action.payload
        }
        case GET_DOGS_BY_NAME: return {
            ...state,
            dogs: state.dogs.filter(e => e.name === action.payload.name)

        }
        default:
            return {
                ...state
            }


    }

}



export default rootReducer; 