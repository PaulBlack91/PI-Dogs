// aca se comunican el front con back 
import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME'
// aca tengo que hacer las restantes 

export const allDogs = () =>async dispatch =>{
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


export const allTemp = () =>async dispatch=>{
    try {
        const localhost = await axios.get('http://localhost:3001/temperaments')
         return dispatch({
            type: GET_TEMPERAMENTS,
            payload: localhost.data
         })
        
    } catch (error) {
        console.log(error)
    }
}


export const getDogsName = (name) =>async dispatch=>{
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