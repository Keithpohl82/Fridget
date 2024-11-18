import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component
import "bulma/css/bulma.min.css";

// Replace with your actual API key
const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const RecipeAPI = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch recipes based on a specific ingredient
  const fetchRecipesByIngredient = async () => {
    if (!ingredientSearch) return; // Don't call API if search term is empty
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}filter.php?i=${ingredientSearch}`
      );
      const data = await response.json();
      console.log(data); // Log data to check the response structure
      setRecipes(data.meals || []); // If no meals are found, it returns an empty array
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ingredientSearch) {
      fetchRecipesByIngredient();
    }
  }, [ingredientSearch]);

  // Handle ingredient search input
  const handleSearchInput = (e) => {
    setIngredientSearch(e.target.value);
  };

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search by ingredient"
            value={ingredientSearch}
            onChange={handleSearchInput}
          />
        </div>
        <div className="control">
          <button
            className="button is-info"
            onClick={fetchRecipesByIngredient}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* Display Recipe Results */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Recipe Results</h2>
          <div className="columns is-multiline">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="column is-one-third" key={recipe.idMeal}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title">{recipe.strMeal}</p>
                      <p className="subtitle">Ingredients-based Search</p>
                      <Link to={`/recipe/${recipe.idMeal}`}>
                        <button className="button is-info">
                          View Recipe
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found for this ingredient.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeAPI;
