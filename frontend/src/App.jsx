import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddIngredients from './components/AddIngredients';
import AddRecipe from './components/AddRecipe';
import IngredientsList from './components/IngredientsList';
import SelectForm from './components/SelectForm';
import Directions from './components/Directions';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="Login" element={<Login/>} />
        <Route path="Register" element={<Register/>} />
        <Route path='Addrecipe' element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

