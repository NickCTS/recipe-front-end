import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import NewRecipeForm from './NewRecipeForm';
import './styles.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched recipes:', data);
        setRecipes(data);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  function addRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe]);
  }

  function toggleStar(id) {
    setRecipes(recipes.map(recipe =>
      recipe.id === id ? { ...recipe, starred: !recipe.starred } : recipe
    ));
  }

  function deleteRecipe(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <RecipeList
            recipes={recipes}
            toggleStar={toggleStar}
            deleteRecipe={deleteRecipe}
          />
        } />
        <Route path="/recipes/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route path="/new-recipe" element={<NewRecipeForm addRecipe={addRecipe} />} />
      </Routes>
    </Router>
  );
}

export default App;
