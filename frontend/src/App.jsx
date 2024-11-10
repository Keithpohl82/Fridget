import React from 'react';

import { UserContainer } from './components/UserContainer';
import AddIngredients from './components/AddIngredients';
import AddRecipe from './components/AddRecipe';
import IngredientsList from './components/IngredientsList';
import SelectForm from './components/SelectForm';
import Directions from './components/Directions';

const App = () => {
  return (
    <div className='container'>
      <UserContainer />
    </div>
  );
};

export default App;

