import React from 'react';

import { UserContainer } from './components/UserContainer';
import Ingredients from './components/AddIngredients';
import Recipe from './components/AddRecipe';
import IngredientsList from './components/IngredientsList';
import SelectForm from './components/SelectForm';
import Directions from './components/Directions';

const App = () => {
  return (
    <div className='container'>
      <Recipe />
    </div>
  );
};

export default App;

