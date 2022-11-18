import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

const Card = ({ id, name, temperament, wheight, image }) => {
  return (
    <Link to={`/Details/${id}`}>
      <div className="card">
        <img className="card-image" src={image} alt="img not found" />
        <p> {name} </p>
        <p>{temperament}</p>
        <p>{wheight}</p>
      </div>
    </Link>
  );
};

export default Card;
