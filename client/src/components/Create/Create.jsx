import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allTemp } from "../../redux/actions";
import NavBar from "../Navbar/Navbar";
import s from "./Create.css";

// estructura de componente, funcional dentro del el (htms) y dentro de (html {js})
const Create = () => {
  const temperament = useSelector((state) => state.temperament);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allTemp());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    temperament: [],
    life_span: "",
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  
  function handleSubmit(e) {
    axios.post("http://localhost:3001/dogs", input);
    alert("Dog Created");
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  console.log(input.temperament);

  return (
    <div>
      <NavBar />
      <form className="content" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" onChange={handleChange} name="name" />
        <label>Height Min</label>
        <input type="text" onChange={handleChange} name="heightMin" />
        <label>Height Max</label>
        <input type="text" onChange={handleChange} name="heightMax" />
        <label>WeightMin</label>
        <input type="text" onChange={handleChange} name="weightMin" />
        <label>WeightMax</label>
        <input type="text" onChange={handleChange} name="weightMax" />
        <label>Life Span</label>
        <input type="text" onChange={handleChange} name="life_span" />
        <label>Imagen</label>
        <input type="text" onChange={handleChange} name="image" />
        <label>Temperament</label>
        <select name="temperament" onChange={handleSelect}>
          {temperament?.map((e) => {
            return <option key={e.id}>{e.name}</option>;
          })}
        </select>
        <div>
          {/* en el map el 'i indica el 'indice simil for */}
          {input.temperament?.map((e, i) => (
            <span key={i} value={e} className = {s.span}>
              {e}
              <button> X </button>{" "}
            </span>
          ))}
        </div>
        <button type="submit">CREATE DOG</button>
      </form>
    </div>
  );
};

export default Create;
