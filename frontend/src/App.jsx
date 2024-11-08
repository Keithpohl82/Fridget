import React from 'react';

import { UserContainer } from './components/UserContainer';
import Ingredients from './components/ingredients';
import Recipe from './components/Recipe';
import IngredientsList from './components/IngredientsList';
import SelectForm from './components/SelectForm';

const App = () => {
  return (
    <div className='container'>
      <SelectForm />
    </div>
  );
};

export default App;

