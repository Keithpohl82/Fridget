import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const RecipeCard = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Construct image URL
  const recipeImage = recipe.photoPath
    ? `http://localhost:8080/${recipe.photoPath}` // Use backend photo path
    : "https://via.placeholder.com/400"; // Placeholder image

  return (
    <div
      className={`card ${isExpanded ? "is-expanded" : ""}`}
      onClick={handleToggleExpand}
      style={{
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        maxWidth: "100%",
        margin: "10px",
        border: "2px solid #ffdd57",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={recipeImage} // Updated to use recipeImage
            alt={`${recipe.name}`}
            style={{ borderRadius: "5px 5px 0 0" }}
          />
        </figure>
      </div>

      <div className="card-content has-background-dark has-text-white">
        <div className="media">
          <div className="media-content">
            <h2 className="title is-4 has-text-white">{recipe.name}</h2>
            <p className="subtitle is-6 has-text-grey-light">
              <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
            </p>
          </div>
        </div>
        {isExpanded && (
          <div className="content">
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime} | <strong>Cook Time:</strong> {recipe.cookTime}
            </p>
            <p>{recipe.description}</p>
            <div className="content">
              <strong>Ingredients:</strong>
              <ul style={{ marginTop: "10px" }}>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{`${item.amount} ${item.unit} ${item.ingredient}`}</li>
                ))}
              </ul>
            </div>
            <div className="content">
              <strong>Directions:</strong>
              <ol style={{ marginTop: "10px" }}>
                {recipe.directions
                  .sort((a, b) => a.stepOrder - b.stepOrder)
                  .map((step, index) => (
                    <li key={index}>{step.directionText}</li>
                  ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
