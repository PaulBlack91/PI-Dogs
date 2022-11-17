import React from "react";
//import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import NavBar from "../Navbar/Navbar.jsx";
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react";
import { allDogs, allTemp } from "../../redux/actions.js";

//ACA HACER EL FILTRADO
// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const Home = () => {
  const dogs = useSelector(state => state.dogs)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(allDogs())
    dispatch(allTemp())
  },[dispatch]//dependencias
  )
  return(
    
    <div>    
      <NavBar/>
      {
        dogs.map(e => {
          return (
          <Card 
          id = {e.id}
          name = {e.name}
          wheight={e.wheight}
          temperament= {e.temperament}
          image= {e.image}
          key= {e.id}          
          />)
        })
      }

     </div>

     )
  }



export default Home;
