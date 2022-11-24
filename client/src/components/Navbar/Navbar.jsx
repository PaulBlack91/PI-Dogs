import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card.jsx";
import {
  allDogs,
  allTemp,
  filterByTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../redux/actions.js";

const NavBar = () => {
  const dogs = useSelector((state) => state.filtro1); //modifique de dogs a filtro1
  const temperament = useSelector((state) => state.temperament);

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(allDogs());
      dispatch(allTemp());
    },
    [dispatch] //dependencias
  );

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
  
  return (
    <nav>
      <Link to="/create">
        <button>Create</button>
      </Link>
      <Link to="/home">Home</Link>
      <SearchBar />
      <hr />
<div>
</div>

      <select
  onChange={(e) => {
    handleFilterCreate(e);
  }}
>
  <option defaultValue value="All">
    {" "}
    Todos{" "}
  </option>
  <option value="created"> DB</option>
  <option value="Api"> API</option>
</select>
<select
  defaultValue="default"
  onChange={(e) => {
    handleFilterTemp(e);
  }}
>
  <option value="default" disabled>
    {" "}
    Temperament{" "}
  </option>
  <option key={0} value="All">
    {" "}
    All{" "}
  </option>
  {temperament.map((e) => (
    <option key={e.id} value={e.name}>
      {" "}
      {e.name}{" "}
    </option>
  ))}
</select>
<div>
  <h5 className="OrderAndFilter">Order by name:</h5>
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
</div>
<div>
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
</div >

    </nav>
  );
};










export default NavBar;
