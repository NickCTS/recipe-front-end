import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  return recipe ? (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.ingredients}</p>
    </div>
  ) : (
    <p>Recipe not found</p>
  );
}

export default RecipeDetail;
