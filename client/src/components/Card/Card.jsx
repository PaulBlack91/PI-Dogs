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
  heightMin,
  heightMax

  
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
              <div>
              <span> Peso: </span>
              <p> {weightMin} - {weightMax} Kg.</p>                 
              </div>
              <div>
              <span> Altura: </span>
              <p> {heightMin} - {heightMax} cm.</p>
              </div>
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
