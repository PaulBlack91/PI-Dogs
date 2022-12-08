// aca se comunican el front con back 
import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME'
export const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS'
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'
export const CLEAN = 'CLEAN'
export const DELETE_DOG =  'DELETE_DOG'


export const allDogs = () => async dispatch => {
    try {
        const localhost = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: localhost.data
        })
    } catch (error) {
        console.log(error)
    }
}


export const allTemp = () => async dispatch => {
    try {
        const localhost = await axios.get('http://localhost:3001/temperaments')
        //console.log(localhost.data)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: localhost.data
        })

    } catch (error) {
        console.log(error)
    }
}


export const getDogsName = (name) => async dispatch => {
    try {
        const localhost = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: localhost.data
        })

    } catch (error) {
        console.log(error)
    }
}

export const filterByTemperament = (payload) => async dispatch => {
    try {
        return dispatch({
            type: FILTER_BY_TEMPERAMENTS,
            payload
        }
        )
    } catch (error) {
        console.log(error)
    }

}

export const filterById = (id) => async dispatch => {

    try {
        const localhost = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: localhost.data

        })
    } catch (error) {
        console.log(error)
    }
}


export const filterCreated = (payload) => async dispatch => {
    try {
        return dispatch({
            type: FILTER_CREATED,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}


export const orderByName = (payload) => async dispatch => {
    try {
        return dispatch({
            type: ORDER_BY_NAME,
            payload
        })

    } catch (error) {
        console.log(error)
    }
}

export const orderByWeight = (payload) => async dispatch => {
    try {
        return dispatch({
            type: ORDER_BY_WEIGHT,
            payload
        })

    } catch (error) {
        console.log(error)
    }
}

export const clean = () => async dispatch => {
    return dispatch({
        type: CLEAN
    })
}

