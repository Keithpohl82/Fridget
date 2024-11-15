import React, { useState } from "react";
import SelectForm from "./SelectForm";
import AddStep from "./Directions";
import PhotoUpload from "./Photoupload";
import "bulma/css/bulma.min.css"; // Make sure you import Bulma's CSS

const AddRecipe = () => {
  const [name, setRecipeName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoUrl] = useState("");
  const [recipeSteps, setDirections] = useState([]);
  const [ingredients, setIngredients] = useState([]);


  const addIngredient = (ingredient) => {
    setIngredients((prevIngredient) => [...prevIngredient, { id: ingredient }]);
  };


  const handleAddStep = (newStep) => {
    setDirections([...recipeSteps, newStep]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch(`http://localhost:8080/recipes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        cookTime,
        prepTime,
        description,
        recipeSteps,
        photoURL,
        ingredients: ingredients,
      }),
    });
    const result = await response.text();
    alert(result);
  };


  return (
    <div className="container mt-5">
      <h2 className="title is-3">Recipe Information</h2>
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Recipe Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Recipe Name"
              value={name}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Cook Time (minutes)</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Cook Time"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Prep Time (minutes)</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Prep Time"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <PhotoUpload PhotoUpload={PhotoUpload} />
          </div>
        </div>

        <div className="field">
          <button
            type="submit"
            className="button is-primary"
            disabled={ingredients.length === 0}
          >
            Add Recipe
          </button>
        </div>
      </form>

      <h2 className="title is-4">Recipe Ingredients</h2>
      <SelectForm addIngredient={addIngredient} />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.id}</li>
        ))}
      </ul>

      <h2 className="title is-4">Directions</h2>
      <AddStep onAddStep={handleAddStep} />
      <ol>
        {recipeSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );

};

export default AddRecipe;
