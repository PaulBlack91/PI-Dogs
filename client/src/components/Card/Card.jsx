import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, temperament, wheight, image }) => {
  return (
    <Link to={`/Details/${id}`}>
      <div className="cardContein">
        <img src={image} alt="img not found" />
        <p> {name} </p>
        <p>{temperament}</p>
        <p>{wheight}</p>
      </div>
    </Link>
  );
};

export default Card;
