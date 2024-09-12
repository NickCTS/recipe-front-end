import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/new-recipe">Add New Recipe</Link>
    </nav>
  );
}

export default NavBar;
