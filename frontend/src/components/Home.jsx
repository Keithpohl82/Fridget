import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component
import "bulma/css/bulma.min.css";
import styles from "../styles/Login.module.css";

const HomePage = () => {
  const [ingredientSearch, setIngredients] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Updated to show loading during both local and API fetch
  const [expandedRecipe, setExpandedRecipe] = useState(null); // Track expanded recipe

  // Fetch all recipes in the database
  useEffect(() => {
    fetch("http://localhost:8080/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  // Function to search recipes from Meal DB API
  const searchApiRecipes = (ingredientSearch) => {
    const apiKey = "1"; // Replace with your actual API key
    return fetch(
      `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${ingredientSearch}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.meals || []; // Returns empty array if no results
      })
      .catch((error) => {
        console.error("Error fetching recipes from API:", error);
        return [];
      });
  };

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  // Filter and combine local and API recipes
  const handleFilter = async () => {
    setIsLoading(true); // Show loading indicator while fetching

    // Filter saved recipes from the backend
    const savedRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase() === ingredientSearch.toLowerCase()
      )
    );

    // Fetch recipes from the Meal DB API
    const apiRecipes = await searchApiRecipes(ingredientSearch);

    // Combine results from both sources
    const combinedResults = [...savedRecipes, ...apiRecipes];
    setRecipeResults(combinedResults);

    setIsLoading(false); // Hide loading indicator once done
  };

  // Construct image URL or use placeholder
  const getImageUrl = (path) => (path ? `http://localhost:8080/${path}` : "https://via.placeholder.com/400");

  const handleCardClick = (recipeId) => {
    // Toggle the expanded recipe on click
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  return (
    <div>
      <section className={`hero is-fullheight is-bold ${styles.hero}`}>
        <div className={`hero-body ${styles.heroBody}`}>
          <div className="container has-text-centered">
            <h1 className={`title ${styles.title}`}>What's in Your Kitchen?</h1>
            <h2 className={`subtitle ${styles.subtitle}`}>
              Let us help you cook with the ingredients you already have!
            </h2>

            <div className={`field has-addons ${styles.formContainer}`}>
              <div className="control is-expanded">
                <input
                  className={`input ${styles.input}`}
                  type="text"
                  placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
                  value={ingredientSearch}
                  onChange={handleInputChange}
                />
              </div>

              <div className="control">
                <button
                  className={`button is-info ${styles.button}`}
                  onClick={handleFilter}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Find Recipes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Results Section */}
        <div>
          {!isLoading && recipeResults.length === 0 && ingredientSearch && (
            <p className="has-text-centered">No recipes found for this ingredient.</p>
          )}

          {recipeResults.length > 0 && (
            <section className={`section ${styles.section2}`}>
              <div className="container">
                <h2 className="title has-text-centered">Recipe Results</h2>
                <div className="columns is-multiline">
                  {recipeResults.map((recipe) => (
                    <div className="column is-one-third" key={recipe.id}>
                      <div
                        className={`${styles.card} card`}
                        onClick={() => handleCardClick(recipe.id)}
                      >
                        <div className={`card-image ${expandedRecipe === recipe.id ? styles.expanded : ""}`}>
                          <figure className="image is-4by3">
                            <img
                              src={getImageUrl(recipe.photoPath || recipe.strMealThumb)} // Handle API and local images
                              alt={recipe.name || recipe.strMeal}
                            />
                          </figure>
                        </div>
                        {expandedRecipe === recipe.id && (
                          <div className="card-content">
                            <p className="title">{recipe.name || recipe.strMeal}</p>
                            <p className="subtitle">{recipe.description || recipe.strInstructions}</p>``
                            <Link to={`/recipes/${recipe.id}`} className="button is-info">
                              View Recipe
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>&copy; 2024 Fridget</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
