import React, { useState, useEffect } from "react";
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
import Recipe from "./components/RecipeHub";
import "bulma/css/bulma.min.css";
import RecipeList from "./components/RecipeList";
import RecipeAPI from "./components/RecipeAPI";
import RecipeDetail from "./components/RecipeDetail";
import { useUser } from "./UserContext";


// // Sample user data
// const user = {
//   profilePicture: "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg",
//   username: "Lil' Chef",
//   bio: "Bestest cook in the galaxy",
//   posts: 120,
//   followers: 300,
//   location: "Saint Louis, USA",
//   email: "lil'chef@cooking.com",
// };

const App = () => {
  
// our custom user hook.
  const { currentUser, setUser } = useUser();
  
  
  

  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/userservice/logout", {
        method: "POST",
        credentials: "include", // Ensures session cookies are sent
      });
      if (response.ok) {
        setUser(null); // Clear user state
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    
    <Router>
      <div className="container"> 
        <Navbar user={currentUser} logoutUser={logoutUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/profile" element={<UserProfile user={currentUser} logoutUser={logoutUser} />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipelist" element={<RecipeList />} />
          <Route path="/recipes" element={<RecipeAPI />} />
          <Route path="/recipe/:idMeal" element={<RecipeDetail />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
