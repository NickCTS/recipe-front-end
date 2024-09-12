import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import NewRecipeForm from './components/NewRecipeForm';
import RecipeSearch from './components/RecipeSearch';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
      });
  }, []);

  function addRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe]);
    setFilteredRecipes([...recipes, newRecipe]);
  }

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <RecipeSearch recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
          <RecipeList recipes={filteredRecipes} />
        </Route>
        <Route path="/recipes/:id">
          <RecipeDetail recipes={recipes} />
        </Route>
        <Route path="/new-recipe">
          <NewRecipeForm addRecipe={addRecipe} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

