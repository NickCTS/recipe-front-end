import React, { useState } from 'react';

function NewRecipeForm({ addRecipe }) {
  const [formData, setFormData] = useState({ name: '', ingredients: '' });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch('http://localhost:3001/recipes', configObj)
      .then(res => res.json())
      .then(newRecipe => {
        addRecipe(newRecipe);
        setFormData({ name: '', ingredients: '' });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Recipe name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={formData.ingredients}
        onChange={handleChange}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default NewRecipeForm;
