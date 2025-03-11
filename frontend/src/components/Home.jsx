import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

// Endpoint for TheMealDB
const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fetch all recipes on mount so they're displayed by default
  const fetchAllRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}search.php?s=`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch recipes by ingredient when the user clicks Search
  const fetchRecipesByIngredient = async () => {
    if (!ingredientSearch) return; // If empty, do nothing
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}filter.php?i=${ingredientSearch}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all recipes on initial mount
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleSearchInput = (e) => {
    setIngredientSearch(e.target.value);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundImage: `url('/Background2.jpg')` }}>
      {/* Hero Section */}
      <section
        className="hero is-fullheight"
        style={{
          backgroundImage: `url('/Home.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />

        <div className="hero-body" style={{ position: "relative" }}>
          <div className="container has-text-centered">
            <h1
              className="title"
              style={{
                color: "#fff",
                textShadow: "0 0 6px rgba(0, 0, 0, 0.6)",
                marginBottom: "1rem",
              }}
            >
              What's in Your Kitchen?
            </h1>
            <h2
              className="subtitle has-text-white"
              style={{ marginBottom: "2rem" }}
            >
              Let us help you cook with the ingredients you already have!
            </h2>

            {/* Search Bar */}
            <div
              className="field has-addons is-inline-flex"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Search by ingredient"
                  value={ingredientSearch}
                  onChange={handleSearchInput}
                  style={{ borderRadius: "4px 0 0 4px" }}
                />
              </div>
              <div className="control">
                <button
                  className="button is-info"
                  onClick={fetchRecipesByIngredient}
                  disabled={isLoading}
                  style={{ borderRadius: "0 4px 4px 0" }}
                >
                  {isLoading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Recipe Results */}
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <h2 className="title has-text-centered">Recipes</h2>

          <div className="columns is-multiline" style={{ marginTop: "2rem" }}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  className="column is-one-third"
                  key={recipe.idMeal}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      maxWidth: "350px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </div>
                    <div className="card-content" style={{ padding: "1rem" }}>
                      <p className="title is-5">{recipe.strMeal}</p>
                      {/* Some recipes from the "search.php?s=" endpoint also have area/category available */}
                      <p className="subtitle is-6 has-text-grey">
                        {recipe.strArea && recipe.strCategory
                          ? `${recipe.strArea} | ${recipe.strCategory}`
                          : recipe.strArea
                          ? recipe.strArea
                          : recipe.strCategory
                          ? recipe.strCategory
                          : ""}
                      </p>
                      <Link to={`/recipe/${recipe.idMeal}`}>
                        <button className="button is-info">View Recipe</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
