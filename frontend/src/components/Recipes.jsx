import { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";

const Recipes = () => {
  const [recipeList, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="title is-3 has-text-centered">Recipes</h1>
      <div className="columns is-multiline">
        {recipeList.map((recipe) => (
          <div key={recipe.id} className="column is-one-third">
            <div className="box">
              <h2 className="title is-4">{recipe.name}</h2>
              <h4 className="subtitle is-6">{recipe.description}</h4>
              <p>
                <strong>Prep Time:</strong> {recipe.prepTime} <br />
                <strong>Cook Time:</strong> {recipe.cookTime} <br />
                <strong>Total Time:</strong> {recipe.totalTime}
              </p>
              <h5 className="subtitle is-5">Ingredients:</h5>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
              <h5 className="subtitle is-5">Directions:</h5>
              <p>{recipe.recipeDirections}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
