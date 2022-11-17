import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getDogsName } from "../../redux/actions";

const SearchBar = () => {
    const dispatch = useDispatch()

    const [input, setImput] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()

        dispatch(
            getDogsName(input)
        )
        setImput('')
        }

    const handleChange = (e)=>{
        setImput(e.target.value)
    }


  return (
    <div>
      <button onClick={handleSubmit}> Buscar </button>
      <input type='search' placeholder="Nombre de Raza" value={input} onChange={handleChange}></input>
    </div>
  );
};

export default SearchBar;
