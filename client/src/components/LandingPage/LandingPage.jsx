import React from "react";
import { Link } from "react-router-dom";
import perro from "../img/bookdogs.jpg";
import './LandingPage.css'


// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const LandingPage = () => {
  return (
    <div className="landing">
      <Link to="/home">
        <h1>CLICK ENTER API DOG</h1>
      </Link>
      <img src={perro} alt="" />
    </div>
  );
};

export default LandingPage;
