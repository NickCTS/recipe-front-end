import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes, toggleStar, deleteRecipe }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter recipes based on search term
  const filteredRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.starred - a.starred); // Starred recipes appear first

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
            <button onClick={() => toggleStar(recipe.id)}>
              {recipe.starred ? 'Unstar' : 'Star'}
            </button>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
