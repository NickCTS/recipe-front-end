// RecipeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleStar = (id) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === id ? { ...recipe, starred: !recipe.starred } : recipe
    );
    setRecipes(updatedRecipes);

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ starred: !recipes.find(recipe => recipe.id === id).starred })
    })
      .catch((error) => console.error('Error updating recipe:', error));
  };

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'DELETE'
    })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  const filteredRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.starred - a.starred); // Starred recipes come first

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <button onClick={() => handleStar(recipe.id)}>
              {recipe.starred ? '★' : '☆'} Star
            </button>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
