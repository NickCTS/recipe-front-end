// NewRecipeForm.js
import React, { useState } from 'react';

function NewRecipeForm({ addRecipe }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now().toString(), // Server will assign ID
      name,
      ingredients,
      steps,
      starred: false,
    };

    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        addRecipe(data); // Update local state
        setName('');
        setIngredients('');
        setSteps('');
      })
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Ingredients:
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </label>
      <label>
        Steps:
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
      </label>
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default NewRecipeForm;
