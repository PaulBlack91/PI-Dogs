import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({id, name, temperament, image, weightMin, weightMax, breeds }) => {
  return (
    <div className="card">
      <Link to={`/Details/${id}`}>
        <div >
          <div>
            <h2> {name} </h2>
          </div>
          
          <div>

          <img className="img" src={image} alt="img not found" />
          </div>
          <p> Temperamentos:{temperament}</p>
          <p>
            {" "}
            Peso: {weightMin} - {weightMax} Kg.
          </p>
          <p> Raza: {breeds}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
