import React from "react";

const Paginado = ({ dogsPerPage, allDogs, paginado }) => {
  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage - 1); i++) {
    pageNumber.push(i + 1 );
  }

  return (
    <nav>
      <div>
        <ul>
          {pageNumber &&
            pageNumber.map((e, i) => (
              <button key={i}><a  onClick={() => paginado(e)}>{e}</a></button>)
              )}
        </ul>
      </div>
    </nav>
  );
};

export default Paginado;
