import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { filterById, clean } from "../../redux/actions";
import NavBar from "../Navbar/Navbar";
import './Details.css'

const Details = (props) => {
  const dog = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(filterById(id)); // la funcion de mi action
    return function(){
      dispatch(clean())
    }
  }, [dispatch, id]);

  return (
    <div>
      <NavBar/>
      <div className="details">
      <h3>Name: {dog.name}</h3>
      <h3>Temperament: {dog.temperament}</h3>
      <h3>HeightMin: {dog.heightMin}</h3>
      <h3>HeightMax: {dog.heightMax}</h3>
      <h3>WeightMin: {dog.weightMin}</h3>
      <h3>WeightMax: {dog.weightMax}</h3>
      <h3>Life Span: {dog.life_span}</h3>
      <h3>Breeds: {dog.breeds}</h3>      
      <img  className="imagen" src={dog.image} alt="img not found" />
      </div>

    </div>
  );
};

export default Details;
