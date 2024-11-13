import { useState, useEffect } from 'react';
import axios from "axios";

const Recipes = () => {

    const [recipeList, setRecipes] = useState([]);
    const [ingredientsList, setIngredients] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/recipes/"
            );
            setRecipes(response.data);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      
      return (
        <div>
          {recipeList.map(recipe => (
            <div key={recipe.id} className="recipe-container">
                
              <h2>Name:{recipe.name}</h2>
              <h4>Description:{recipe.description}</h4>
              <p>Prep Time: {recipe.prepTime}<br/> Cook Time: {recipe.cookTime}<br/> Total time: {recipe.totalTime}</p>
              {ingredientsList.map(ingredient => (<div key={ingredient.id}>{ingredient.name}</div>))}
              <p>Directions: {recipe.recipeDirections}</p>
            </div>
          ))}
        </div>
      );
      
};

export default Recipes;