import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const RecipeAPI = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fetch by ingredient (partial info).
  // 2. For each returned meal, fetch full details via "lookup.php?i=".
  const fetchRecipesByIngredient = async () => {
    if (!ingredientSearch) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}filter.php?i=${ingredientSearch}`);
      const data = await response.json();

      if (!data.meals) {
        // If no meals found, set empty array and return
        setRecipes([]);
        setIsLoading(false);
        return;
      }

      // For each meal, fetch the full meal details
      const detailedMeals = await Promise.all(
        data.meals.map(async (meal) => {
          const detailRes = await fetch(`${API_URL}lookup.php?i=${meal.idMeal}`);
          const detailData = await detailRes.json();
          // detailData.meals[0] should have the full meal info (strArea, etc.)
          return detailData.meals[0];
        })
      );

      setRecipes(detailedMeals);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
    }
  };

  // When ingredientSearch changes, automatically trigger search
  useEffect(() => {
    if (ingredientSearch) {
      fetchRecipesByIngredient();
    }
  }, [ingredientSearch]);

  const handleSearchInput = (e) => {
    setIngredientSearch(e.target.value);
  };

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="field has-addons" style={{ marginTop: "1rem" }}>
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search by ingredient (e.g. 'Chicken')"
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
                <div className="column is-one-fifth" key={recipe.idMeal}>
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
                      {/* Display the cuisine/area */}
                      <p className="subtitle">{recipe.strArea}: {recipe.strCategory}</p>

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
