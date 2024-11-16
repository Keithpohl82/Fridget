import React, { useState } from "react";
import "bulma/css/bulma.min.css";

// PhotoUpload Component
const PhotoUpload = ({ setPhotoUrl, photoURL }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPhotoUrl(fileURL);
    }
  };

  const handleResetPhoto = () => {
    setPhotoUrl("");
  };

  return (
    <div>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {photoURL ? (
        <div
          style={{ marginTop: "20px", cursor: "pointer" }}
          onClick={handleResetPhoto}
        >
          <img
            src={photoURL}
            alt="Uploaded Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              border: "2px solid #ccc",
            }}
          />
          <p style={{ textAlign: "center", color: "#007bff" }}>Change the photo</p>
        </div>
      ) : (
        <label
          htmlFor="photo-upload"
          style={{
            display: "inline-block",
            width: "100%",
            height: "200px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            textAlign: "center",
            lineHeight: "200px",
            cursor: "pointer",
            fontSize: "24px",
            color: "#aaa",
            fontWeight: "bold",
          }}
        >
          <span role="img" aria-label="Upload Image">📷</span> Upload Image
        </label>
      )}
    </div>
  );
};

// AddRecipe Component
const AddRecipe = () => {
  const [name, setRecipeName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoUrl] = useState("");
  const [directions, setDirections] = useState([]);
  const [stepNumber, setStepNumber] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [stepInput, setStepInput] = useState("");

  // Add ingredient to the list
  const addIngredient = () => {
    if (ingredientInput.trim() !== "" && amountInput.trim() !== "" && unitInput !== "") {
      const newIngredient = {
        ingredient: ingredientInput,
        amount: amountInput,
        unit: unitInput,
      };
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setIngredientInput("");
      setAmountInput("");
      setUnitInput("");
    }
  };

  const AddStep = () => {
    if(stepInput.trim() !== ""){
      const newStep = {
        directionText : stepInput,
        stepOrder: directions.length + 1,
      };
      setDirections((prevSteps) => [...prevSteps, newStep]);
      setStepInput("");
    }
  };

  // Add a step to the recipe
  const handleAddStep = () => {
    if (stepInput.trim() !== "") {
      setDirections([...directions, stepInput]);
      setStepInput("");
    }
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // Remove step
  const removeStep = (index) => {
    const updatedSteps = directions.filter((_, i) => i !== index);
    setDirections(updatedSteps);
  };

  // Handle form submission
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
        directions,
        photoURL,
        ingredients,
      }),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <div className="container mt-5">
      <h1 className="title is-2">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="box">
        <div className="columns">
          {/* Photo Upload Column */}
          <div className="column is-one-third">
            <h2 className="title is-4">Upload Photo</h2>
            <PhotoUpload setPhotoUrl={setPhotoUrl} photoURL={photoURL} />
          </div>

          {/* Description Column */}
          <div className="column">
            <h2 className="title is-4">Recipe Information</h2>
            <div className="field">
              <label className="label">Recipe Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter recipe name"
                  value={name}
                  onChange={(e) => setRecipeName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Brief description of the recipe"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Cook Time (minutes)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      placeholder="e.g. 30"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label className="label">Prep Time (minutes)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      placeholder="e.g. 15"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="section">
          <h2 className="title is-4">Ingredients</h2>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Amount"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
              />
            </div>

            <div className="control">
              <div className="select">
                <select
                  value={unitInput}
                  onChange={(e) => setUnitInput(e.target.value)}
                >
                  <option value="">Select unit</option>
                  <option value="cups">Cups</option>
                  <option value="teaspoons">Teaspoons</option>
                  <option value="tablespoons">Tablespoons</option>
                  <option value="grams">Grams</option>
                  <option value="ounces">Ounces</option>
                </select>
              </div>
            </div>

            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
              />
            </div>

            <div className="control">
              <button
                type="button"
                className="button is-primary"
                onClick={addIngredient}
              >
                Add Ingredient
              </button>
            </div>
          </div>

          <ul>
            {ingredients.map((ingredient, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center" }}>
              {ingredient.amount} {ingredient.unit} of {ingredient.ingredient}
              <button
                type="button"
                className="delete is-small"
                onClick={() => removeIngredient(index)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              />
            </li>
            ))}
          </ul>
        </div>

        {/* Directions Section */}
        <div className="section">
          <h2 className="title is-4">Directions</h2>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Add a step"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
              />
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-primary"
                onClick={AddStep}
              >
                Add Step
              </button>
            </div>
          </div>

          <ul>
            {directions.map((step, index) => (
              <li key={index}>
                Step {step.stepOrder}: {step.directionText}
                <button
                  type="button"
                  className="delete is-small"
                  onClick={() => removeStep(index)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <div className="section">
          <div className="field">
            <button
              type="submit"
              className="button is-primary is-fullwidth"
              disabled={ingredients.length === 0 || directions.length === 0}
            >
              Save Recipe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
