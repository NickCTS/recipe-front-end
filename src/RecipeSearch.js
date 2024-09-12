import React, { useState } from 'react';

function RecipeSearch({ recipes, setFilteredRecipes }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(value)
    );
    setFilteredRecipes(filtered);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default RecipeSearch;
