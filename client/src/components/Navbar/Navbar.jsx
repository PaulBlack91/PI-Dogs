import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <nav>
        <Link to = '/Create'>
      <button >Create</button>
      </Link>
      <SearchBar />
    </nav>
  );
};


export default NavBar;