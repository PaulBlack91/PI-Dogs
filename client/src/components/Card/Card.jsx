import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({
  id,
  name,
  temperament,
  image,
  weightMin,
  weightMax,
  breeds,
}) => {
  return (
    <div className="card">
      <Link to={`/Details/${id}`}>
        <div>
          <div>
            <div className="name">
              <h2> {name} </h2>
            </div>
            <div className="img">
              <img src={image} alt="img not found" />
            </div>
          </div>

          <div>
            <h3> Temperamentos: </h3>
            <p>{temperament}</p>
            <div className="texto">
              <span> Peso: </span>
              <p> {weightMin} - {weightMax} Kg.</p>              
              <span> Raza: </span> <p> {breeds}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
