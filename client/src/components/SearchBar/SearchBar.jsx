import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getDogsName } from "../../redux/actions";



const SearchBar = ({paginado}) => {
    const dispatch = useDispatch()
    const [input, setImput] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        paginado(1)                 
        dispatch(
            getDogsName(input)
            )
            if(!input){
              return alert('no')
            }
            console.log(input, 'algo')
        setImput('')
        }

    const handleChange = (e)=>{     
        setImput(e.target.value)
    }


  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
      <button onClick={handleSubmit}> Buscar </button>
      <input type='search' placeholder="Nombre de Raza" value={input} onChange={handleChange}></input>
      </form>
    </div>
  );
};

export default SearchBar;
