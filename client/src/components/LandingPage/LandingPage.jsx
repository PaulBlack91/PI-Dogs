import React from "react";
import { Link } from "react-router-dom";
import perro from "../img/bookdogs.jpg";

// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const LandingPage = () => {
  return (
    <div>
      <Link to="/home">
        <h1>API DOGS</h1>
      </Link>
      <img src={perro} alt="" />
    </div>
  );
};

export default LandingPage;
