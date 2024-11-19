import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";

// Replace with your actual API key
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
    <div className="container">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </figure>
        </div>
        <div className="card-content">
          <h2 className="title">{recipe.strMeal}</h2>
          <p className="subtitle">{recipe.strCategory}</p>
          <p><strong>Instructions:</strong> {recipe.strInstructions}</p>

          <h3 className="subtitle">Ingredients</h3>
          <ul>
            {[...Array(20)].map((_, index) => {
              const ingredient = recipe[`strIngredient${index + 1}`];
              const measure = recipe[`strMeasure${index + 1}`];
              if (ingredient) {
                return (
                  <li key={index}>
                    {ingredient} - {measure}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
