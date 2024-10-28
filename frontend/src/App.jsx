import React from 'react';

import { UserContainer } from './components/UserContainer';
import Ingredients from './components/ingredients';
import Recipe from './components/Recipe';
import IngredientsList from './components/IngredientsList';

const App = () => {
  return (
    <div className='container'>
      <IngredientsList />
    </div>
  );
};

export default App;

