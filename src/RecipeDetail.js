// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [id]);

  const handleStar = () => {
    const updatedRecipe = { ...recipe, starred: !recipe.starred };
    setRecipe(updatedRecipe);

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ starred: !recipe.starred })
    })
      .catch((error) => console.error('Error updating recipe:', error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <button onClick={handleStar}>
        {recipe.starred ? '★' : '☆'} Star
      </button>
      <button onClick={handleDelete}>Delete</button>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <p>{recipe.steps}</p>
    </div>
  );
}

export default RecipeDetail;
