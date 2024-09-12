import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching recipe with ID:', id);
    console.log('Available recipes:', recipes);

    const foundRecipe = recipes.find(r => r.id === id);

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      console.warn('Recipe with ID not found:', id);
    }
    setLoading(false);
  }, [id, recipes]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.starred ? '⭐ Starred' : '☆ Not Starred'}</p>
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
