import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bulma/css/bulma.min.css';

const HomePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSearch = async () => {
    if (!ingredients) return;
   

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/recipes?ingredients=${ingredients}`);
      const data = await response.json();
      setRecipeResults(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <input
                  className="input"
                  type="text"
                  placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
                  value={ingredients}
                  onChange={handleInputChange}
                />
              </div>
              <div className="control">
                <button className="button is-info" onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Find Recipes'}
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

      {/* Featured Recipes (Optional) */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Featured Recipes</h2>
          <div className="columns is-multiline">
            {/* Example recipe items */}
            <div className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="https://via.placeholder.com/400" alt="Recipe 1" />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title">Recipe 1</p>
                  <p className="subtitle">A delicious meal!</p>
                </div>
              </div>
            </div>
            {/* Repeat similar blocks for other featured recipes */}
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
                        <img src={recipe.image || 'https://via.placeholder.com/400'} alt={recipe.name} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title">{recipe.name}</p>
                      <p className="subtitle">{recipe.description}</p>
                      <button className="button is-info">View Recipe</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ingredient Categories Section */}
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">Popular Ingredients</h2>
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <button className="button is-link is-fullwidth">Meats</button>
            </div>
            <div className="column is-one-quarter">
              <button className="button is-link is-fullwidth">Vegetables</button>
            </div>
            <div className="column is-one-quarter">
              <button className="button is-link is-fullwidth">Spices</button>
            </div>
            <div className="column is-one-quarter">
              <button className="button is-link is-fullwidth">Grains</button>
            </div>
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
