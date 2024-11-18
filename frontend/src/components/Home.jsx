import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const HomePage = () => {
  const [ingredientSearch, setIngredients] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRecipes, setLoading] = useState(true);

  // Fetch all recipes in the database
  useEffect(() => {
    fetch("http://localhost:8080/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loadingRecipes) {
    return <p>Loading recipes...</p>;
  }

  // Get a random recipe for the featured section
  const getRandomIndex = () => Math.floor(Math.random() * recipes.length);
  const randomIndex = getRandomIndex();
  const randomRecipe = recipes[randomIndex];

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  // Filter recipes based on ingredient search
  const handleFilter = () => {
    const filterArr = recipes.filter((recipe) => recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === ingredientSearch.toLowerCase()));
    setRecipeResults(filterArr);
    console.log("filterArr:", filterArr);
  };

  // Construct image URL or use placeholder
  const getImageUrl = (path) => (path ? `http://localhost:8080/${path}` : "https://via.placeholder.com/400");

  return (
    <div>
      {/* Hero Section */}
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">What's in Your Kitchen?</h1>
            <h2 className="subtitle">Let us help you cook with the ingredients you already have!</h2>

            <div className="field has-addons">
              <div className="control is-expanded">
                <input className="input" type="text" placeholder="Enter ingredients (e.g., chicken, rice, broccoli)" value={ingredientSearch} onChange={handleInputChange} />
              </div>
              <div className="control">
                <button className="button is-info" onClick={handleFilter} disabled={isLoading}>
                  {isLoading ? "Searching..." : "Find Recipes"}
                </button>
              </div>
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

      {/* Recipe Results Section */}
      {recipeResults.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="title has-text-centered">Recipe Results</h2>
            <div className="columns is-multiline">
              {recipeResults.map((recipe, index) => (
                <div className="column is-one-third" key={index}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={getImageUrl(recipe.photoPath)} // Use dynamic image URL
                          alt={recipe.name}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title">{recipe.name}</p>
                      <p className="subtitle">{recipe.description}</p>
                      <Link to={`/recipes/${recipe.id}`} className="button is-info">
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Recipes Section */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Featured Recipes</h2>
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={getImageUrl(randomRecipe.photoPath)} // Use dynamic image URL
                      alt={randomRecipe.name}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title">{randomRecipe.name}</p>
                  <p className="subtitle">{randomRecipe.description}</p>
                </div>
              </div>
            </div>
            {/* Repeat similar blocks for other featured recipes if needed */}
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
