// RecipeSearch.js
import React from 'react';

function RecipeSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}

export default RecipeSearch;
