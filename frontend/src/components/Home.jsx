import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
   
    const fetchRecipesByIngredient = async () => {
      if (!ingredientSearch) return; 
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}filter.php?i=${ingredientSearch}`
        );
        const data = await response.json();
        console.log(data); 
        setRecipes(data.meals || []); 
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
  
    const handleSearchInput = (e) => {
      setIngredientSearch(e.target.value);
    };

  return (
    <div
    className="container is-fluid"
        style={{
          backgroundImage: `url('/Background2.jpg')`,
          backgroundSize: 'right top',
        }}
    >



      
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('/Home.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-body">

            <h1 className="title">What's in Your Kitchen?</h1>
            <h2 className="subtitle">Let us help you cook with the ingredients you already have!</h2>

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

        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">How It Works</h2>
          <div className="columns is-centered">
            <div className="column is-one-third">
              <div className="box">
                <h3 className="subtitle">1. Add Ingredients</h3>
                <p>Type in the ingredients you have in your kitchen.</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <h3 className="subtitle">2. Get Recipe Suggestions</h3>
                <p>We will suggest recipes based on what you have.</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <h3 className="subtitle">3. Cook and Enjoy!</h3>
                <p>Choose your recipe, cook it, and enjoy your meal!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>&copy; 2024 My Recipe App</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
