import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const RecipeDetail = () => {
  const { idMeal } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipe details by ID
  const fetchRecipeDetail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}lookup.php?i=${idMeal}`);
      const data = await response.json();
      setRecipe(data.meals ? data.meals[0] : null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idMeal) {
      fetchRecipeDetail();
    }
  }, [idMeal]);

  if (isLoading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      {/* Top box: Title and category/cuisine */}
      <div className="box" style={{ borderRadius: "6px" }}>
        <h2 className="title" style={{ marginBottom: "0.5rem" }}>
          {recipe.strMeal}
        </h2>
        <p className="subtitle is-6 has-text-grey">
          <strong></strong> {recipe.strArea} &nbsp;|&nbsp; 
          <strong></strong> {recipe.strCategory}
        </p>
      </div>

      <div className="columns" style={{ marginTop: "1rem" }}>
        {/* Left column: Recipe image */}
        <div className="column is-one-third">
          <div className="box" style={{ borderRadius: "6px" }}>
            <figure
              className="image is-4by3"
              style={{ borderRadius: "6px", overflow: "hidden" }}
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </figure>
          </div>
        </div>

        {/* Right column: Ingredients */}
        <div className="column">
          <div className="box" style={{ borderRadius: "6px" }}>
            <h3 className="subtitle is-5">Ingredients</h3>
            <ul style={{ listStyleType: "disc", marginLeft: "1.25rem" }}>
              {[...Array(20)].map((_, index) => {
                const ingredient = recipe[`strIngredient${index + 1}`];
                const measure = recipe[`strMeasure${index + 1}`];
                if (ingredient && ingredient.trim()) {
                  return (
                    <li key={index}>
                      {ingredient} – {measure}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions box below both columns */}
      <div className="box" style={{ marginTop: "1rem", borderRadius: "6px" }}>
        <h3 className="subtitle is-5">Instructions</h3>
        <p style={{ whiteSpace: "pre-line" }}>
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;
