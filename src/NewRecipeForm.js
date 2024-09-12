// NewRecipeForm.js
import React, { useState } from 'react';

function NewRecipeForm({ addRecipe }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now().toString(), // or another unique ID generator
      name,
      ingredients,
      steps,
      starred: false,
    };
    addRecipe(newRecipe);
    setName('');
    setIngredients('');
    setSteps('');
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
