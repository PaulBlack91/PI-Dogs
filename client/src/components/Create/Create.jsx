import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allTemp } from "../../redux/actions";

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

  const validate = (input) => {
    let errors = {};

    if (input.name.length < 2) {
      errors.name = "El nombre debe tener al menos 2 letras";
    }

    if (input.heightMin > input.heightMax) {
      errors.height = "La altura mínima no puede ser mayor que la máxima";
    }

    //lo mismo con el peso

    return errors;
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    let resultado = validate(input);
    let dato = Object.values(resultado);

    //objecto.values guarda en un array solo los valores del objeto
    if (dato.length) {
      e.preventDefault();
      return alert(dato.join("\n"));
    }

    axios.post("http://localhost:3001/dogs", input);
    alert("Dog Created");
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleDelete(event) {
    event.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== event.target.value),
    });
  }

  return (
    <div className="bodycreate">
      <div>
        <div className="nav">
          <Link to="/home">
            <button>Home</button>
          </Link>
        </div>
      </div>
      <h1>CREA TU PERRO</h1>
      <div className="create">
        <form className="content" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" onChange={handleChange} name="name" required />
          <label>Height Min</label>
          <input
            type="text"
            onChange={handleChange}
            name="heightMin"
            required
          />
          <label>Height Max</label>
          <input
            type="text"
            onChange={handleChange}
            name="heightMax"
            required
          />
          <label>WeightMin</label>
          <input
            type="text"
            onChange={handleChange}
            name="weightMin"
            required
          />
          <label>WeightMax</label>
          <input
            type="text"
            onChange={handleChange}
            name="weightMax"
            required
          />
          <label>Life Span</label>
          <input type="text" onChange={handleChange} name="life_span" />
          <label>Imagen</label>
          <input type="text" onChange={handleChange} name="image" />
          <label>Temperament</label>
          <select name="temperament" onChange={handleSelect} required>
            {temperament?.map((e) => {
              return <option key={e.id}>{e.name}</option>;
            })}
          </select>
          <div>
            {/* en el map el 'i indica el 'indice simil for */}
            {input.temperament?.map((e, i) => (
              <span key={i} value={e} className={s.span}>
                {e}
                <button onClick={handleDelete} value={e}>
                  X
                </button>
              </span>
            ))}
          </div>
          <button type="submit">CREATE DOG</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
