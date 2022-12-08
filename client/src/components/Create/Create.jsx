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

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    temperament: [],
    life_span: "",
    breeds: "",
    image: "",
  });

  const validate = (input) => {
    let errors = {};

    if (input.name.length < 2) {
      errors.name = "El nombre debe tener al menos 2 letras";
    }
    
    if (isNaN(parseInt(input.heightMin))) {
      errors.heightMin = "La altura mínima tiene que ser un número";
    }
    if (isNaN(parseInt(input.heightMax))) {
      errors.heightMax = "La altura máxima tiene que ser un número";
    }

    if (input.heightMin < 20) {
      errors.heightMin = "No puede ser menor a 20 cm";
    }

    if (input.heightMax <= input.heightMin) {
      errors.height =
        "La altura máxima no puede ser menor o igual que la mínima";
    }

    if (input.heightMax > 100) {
      errors.heightMax = "No puede ser mayor a 100 cm";
    }

    if (isNaN(parseInt(input.weightMin))) {
      errors.weightMin = "El peso mínimo tiene que ser un número";
    }

    if (isNaN(parseInt(input.weightMax))) {
      errors.weightMax = "El peso tiene que ser un número";
    }

    if (input.weightMin < 1) {
      errors.weightMin = "No puede ser menor a 1 kilo";
    }

    if (input.weightMax <= input.weightMin) {
      errors.weight = "El peso maximo no puede ser menor o igual que al mínimo";
    }

    return errors;
  };

  const errorMsj = validate(input);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    let resultado = validate(input);
    let dato = Object.values(resultado);

    //objeto.values guarda en un array solo los valores del objeto
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

  

  useEffect(() => {
    dispatch(allTemp());
  }, [dispatch]);

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
          <p className="formerror">{errorMsj.name}</p>

          <label>Height Min</label>
          <input
            type="text"
            onChange={handleChange}
            name="heightMin"
            required
          />
          <p className="formerror">{errorMsj.heightMin}</p>

          <label>Height Max</label>
          <input
            type="text"
            onChange={handleChange}
            name="heightMax"
            required
          />
          <p className="formerror">
            {errorMsj.height}, {errorMsj.heightMax}
          </p>

          <label>WeightMin</label>
          <input
            type="text"
            onChange={handleChange}
            name="weightMin"
            required
          />
          <p className="formerror"> {errorMsj.weightMin}</p>

          <label>WeightMax</label>
          <input
            type="text"
            onChange={handleChange}
            name="weightMax"
            required
          />
          <p className="formerror"> {errorMsj.weight}</p>
          <label>Life Span</label>
          <input type="text" onChange={handleChange} name="life_span" />
          <label>Imagen</label>
          <input type="text" onChange={handleChange} name="image" />

          <label>Temperament</label>
          <select name="temperament" onChange={handleSelect} required>
            {temperament?.map((e) => {
              return <option key={e.id}> {e.name} </option>;
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
          
          <button type="submit" disabled={!input.name || !input.heightMin || !input.heightMax || !input.weightMin || !input.weightMax }>CREATE DOG</button>

        </form>
      </div>
    </div>
  );
};

export default Create;
