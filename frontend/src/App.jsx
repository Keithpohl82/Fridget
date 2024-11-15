// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Ingredients from "./components/AddIngredients";
import AddRecipe from "./components/AddRecipe";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import GroceryList from "./components/GroceryList";
import UserProfile from "./components/UserProfile"; // Import 
import Recipe from './components/RecipeHub';
import 'bulma/css/bulma.min.css';



// Sample user data
const user = {
  profilePicture: "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg",
  username: "Lil' Chef",
  bio: "Bestest cook in the galaxy",
  posts: 120,
  followers: 300,
  location: "Saint Louis, USA",
  email: "lil'chef@cooking.com",
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/add-recipe" element={<AddRecipe />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
