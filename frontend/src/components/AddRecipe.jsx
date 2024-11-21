import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "bulma/css/bulma.min.css";

const PhotoUpload = ({ setPhotoUrl, photoURL, setPhotoFile }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      // Compress the image
      const options = {
        maxSizeMB: 1, // Compress to max 1MB
        maxWidthOrHeight: 1024, // Resize to max 1024px dimension
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // Update preview and pass file to parent
      const previewURL = URL.createObjectURL(compressedFile);
      setPhotoUrl(previewURL); // Update the preview
      setPhotoFile(compressedFile); // Pass the compressed file to parent
    } catch (error) {
      console.error("Error compressing photo:", error);
      alert("An error occurred while processing the photo.");
    }
  };

  const handleResetPhoto = () => {
    setPhotoUrl("https://via.placeholder.com/400"); // Clear preview to placeholder
    setPhotoFile(null); // Clear the file
  };

  return (
    <div>
      <input type="file" id="photo-upload" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
      {photoURL !== "https://via.placeholder.com/400" ? (
        <div style={{ marginTop: "20px", cursor: "pointer" }} onClick={handleResetPhoto}>
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
          <span role="img" aria-label="Upload Image">
            📷
          </span>{" "}
          Upload Image
        </label>
      )}
    </div>
  );
};

const AddRecipe = () => {
  const [name, setRecipeName] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoUrl] = useState("https://via.placeholder.com/400");
  const [photoFile, setPhotoFile] = useState(null); // Store the file for backend upload
  const [directions, setDirections] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [author, setAuthor] = useState();

  //Gets the user so we can assign them as the author.
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/userservice/current-user", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent
      });

      if (response.ok) {
        const recipeAuthor = await response.json();
        console.log("Fetched author:", recipeAuthor); // Debug log
        setAuthor(recipeAuthor.id); // Ensure the full UserDTO is set, including id
      } else {
        console.error("Failed to fetch current user.");
        setUser(null); // No user logged in
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
    }
  }

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
    if (stepInput.trim() !== "") {
      const newStep = {
        directionText: stepInput,
        stepOrder: directions.length + 1,
      };
      setDirections((prevSteps) => [...prevSteps, newStep]);
      setStepInput("");
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const removeStep = (index) => {
    const updatedSteps = directions.filter((_, i) => i !== index);
    setDirections(updatedSteps);
  };

  const resetForm = () => {
    setRecipeName("");
    setCookTime("");
    setPrepTime("");
    setDescription("");
    setIngredients([]);
    setDirections([]);
    setCuisine("");
    setPhotoUrl("https://via.placeholder.com/400");
    setPhotoFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getUser();
    setIsSubmitting(true);
    try {
      const recipeResponse = await fetch("http://localhost:8080/recipes/add", {
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
          ingredients,
          cuisine,
          author,
        }),
        
      });
      
      if (!recipeResponse.ok) {
        throw new Error("Failed to add recipe.");
      }

      const recipeData = await recipeResponse.json();
      const recipeId = recipeData.id;
      
      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);

        const photoResponse = await fetch(`http://localhost:8080/recipes/${recipeId}/upload-photo`, {
          method: "POST",
          body: formData,
        });

        if (!photoResponse.ok) {
          throw new Error("Failed to upload photo.");
        }

        const photoResult = await photoResponse.json();
        console.log("Photo uploaded:", photoResult.photoPath);
        alert("Recipe and photo added successfully!");
      } else {
        alert("Recipe added successfully! (No photo uploaded)");
      }

      resetForm();
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title is-2">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="box">
        <div className="columns">
          <div className="column is-one-third">
            <h2 className="title is-4">Upload Photo</h2>
            <PhotoUpload setPhotoUrl={setPhotoUrl} photoURL={photoURL} setPhotoFile={setPhotoFile} />
          </div>
          <div className="column">
            <h2 className="title is-4">Recipe Information</h2>
            <div className="field">
              <label className="label">Recipe Name</label>
              <input className="input" type="text" placeholder="Enter recipe name" value={name} onChange={(e) => setRecipeName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Cuisine</label>
              <input className="input" type="text" placeholder="Enter Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Description</label>
              <textarea className="textarea" placeholder="Brief description of the recipe" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="section">
          <h2 className="title is-4">Ingredients</h2>
          <div className="field has-addons">
            <input className="input" type="number" placeholder="Amount" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
            <div className="select">
              <select value={unitInput} onChange={(e) => setUnitInput(e.target.value)}>
                <option value="">Select unit</option>
                <option value="cups">Cups</option>
                <option value="teaspoons">Teaspoons</option>
                <option value="tablespoons">Tablespoons</option>
                <option value="grams">Grams</option>
                <option value="ounces">Ounces</option>
              </select>
            </div>
            <input className="input" type="text" placeholder="Ingredient" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
            <button type="button" className="button is-primary" onClick={addIngredient}>
              Add Ingredient
            </button>
          </div>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                <button type="button" className="delete" onClick={() => removeIngredient(index)} />
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2 className="title is-4">Directions</h2>
          <div className="field has-addons">
            <input className="input" type="text" placeholder="Add a step" value={stepInput} onChange={(e) => setStepInput(e.target.value)} />
            <button type="button" className="button is-primary" onClick={AddStep}>
              Add Step
            </button>
          </div>
          <ol>
            {directions.map((step, index) => (
              <li key={index}>
                Step {step.stepOrder}: {step.directionText}
                <button type="button" className="delete" onClick={() => removeStep(index)} />
              </li>
            ))}
          </ol>
        </div>
        <button type="submit" className="button is-primary is-fullwidth" disabled={isSubmitting || name.trim() === "" || description.trim() === "" || ingredients.length === 0 || directions.length === 0}>
          {isSubmitting ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
