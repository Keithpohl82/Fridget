import React from 'react';


import AddIngredients from './components/AddIngredients';
import AddRecipe from './components/AddRecipe';
import IngredientsList from './components/IngredientsList';
import SelectForm from './components/SelectForm';
import Directions from './components/Directions';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <div className='container'>
      <Login />
    </div>
  );
};

export default App;

