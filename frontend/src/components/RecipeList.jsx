import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="columns is-multiline is-mobile">
        {recipes.map((recipe, index) => (
          <div
            className="column is-one-quarter" // 1/4 of the row for desktop, making 4 columns per row
            key={index}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default RecipeList;
