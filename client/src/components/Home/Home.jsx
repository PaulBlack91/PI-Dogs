import React, { useState } from "react";
import { home, home1 } from "./Home.css";
import Card from "../Card/Card.jsx";
import NavBar from "../Navbar/Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  allDogs,
  allTemp, 
} from "../../redux/actions.js";
import Paginado from "../Paginado/Paginado.jsx";

//ACA HACER EL FILTRADO
// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const Home = () => {
  const dogs = useSelector((state) => state.filtro1); //modifique de dogs a filtro1

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(allDogs());
      dispatch(allTemp());
    },
    [dispatch] //dependencias
  );
    
  const [currentPage, setCurrentPage] = useState(1);

  const [dogsPerPage, setDogsPerPage] = useState(8);
  // numero pag * cantidad de perros por pag
  const indexOfLastDog = currentPage * dogsPerPage;
  // indice del ultimo perro menos cantida de perros pp
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const currentDogs = dogs?.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home1">
      <NavBar />

      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={dogs.length}
        paginado={paginado}
      />

      <div className="home">
        {currentDogs?.map((e) => {
          return (
            <Card
              id={e.id}
              name={e.name}
              image={e.image}
              weightMin={e.weightMin}
              weightMax={e.weightMax}
              heightMin={e.heightMin}
              heightMax={e.heightMax}
              breeds={e.breeds}
              temperament={e.temperament}
              life_span={e.life_span}
              key={e.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
