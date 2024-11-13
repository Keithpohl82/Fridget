// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Ingredients from "./components/AddIngredients";
import Recipe from "./components/AddRecipe";
import IngredientsList from "./components/IngredientsList";
import SelectForm from "./components/SelectForm";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // Import the Navbar component
import GroceryList from "./components/GroceryList";
import Fridge from './components/Fridge'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar /> {/* Add Navbar above Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/fridge" element={<Fridge />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;