import React, { useState } from "react";
import "./Home.css";
import Card from "../Card/Card.jsx";
import logo from "../../dog.png";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  allDogs,
  allTemp,
  filterByTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../redux/actions.js";
import Paginado from "../Paginado/Paginado.jsx";

//ACA HACER EL FILTRADO
// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const Home = () => {
  const dogs = useSelector((state) => state.dogs); //modifique de dogs a filtro1
  const temperament = useSelector((state) => state.temperament);

  const dispatch = useDispatch();

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

  function handleFilterTemp(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  }

  function handleFilterCreate(e) {
    dispatch(filterCreated(e.target.value));
  }

  const handleClickOrder = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };

  const handleClickWOrder = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
  };

  useEffect(
    () => {
      !dogs.length && dispatch(allDogs());
      dispatch(allTemp());
    },
    [dispatch, dogs] //dependencias
  );

  return (
    <div className="home1">
      <nav className="nav">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="home" title="Home" />
          </Link>
        </div>
        <div className="link">
          <Link to="/create">
            <button>Create</button>
          </Link>
        </div>

        <SearchBar paginado={paginado} />
        <h5 className="OrderAndFilter"> Filter by: </h5>
        <div className="filtros">
          <select onChange={(e) => handleFilterCreate(e)}>
            <option defaultValue value="All">
              Todos
            </option>
            <option value="created"> DB</option>
            <option value="Api">API</option>
          </select>
          <select
            defaultValue="default"
            onChange={(e) => {
              handleFilterTemp(e);
            }}
          >
            
            <option value="default" disabled>
              Temperament
            </option>
            <option key={0} value="All">
              All
            </option>
            {temperament.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="order">
          <h5 className="OrderAndFilter"> Order by name: </h5>
          <select
            onChange={(e) => {
              handleClickOrder(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>

          <h5 className="OrderAndFilter">Order by Weight:</h5>
          <select
            onChange={(e) => {
              handleClickWOrder(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">Mayor a Menor</option>
            <option value="desc">Menor a Mayor</option>
          </select>
          <hr />
        </div>
      </nav>

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
