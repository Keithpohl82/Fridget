import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`recipe-card ${isExpanded ? "expanded" : ""}`}
      onClick={handleToggleExpand}
      style={{
        backgroundColor: "black",
        color: "white",
        border: "2px solid yellow",
        borderRadius: "10px",
        width: isExpanded ? "600px" : "200px",
        transition: "width 0.3s ease",
        cursor: "pointer",
      }}
    >
      <img
        src={recipe.photoURL}
        alt={`${recipe.name}`}
        className="recipe-card__image"
        style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
      />
      <div className="recipe-card__content" style={{ padding: "10px" }}>
        <h2 className="recipe-card__title">{recipe.name}</h2>
        <p className="recipe-card__cuisine">
          <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
        </p>
        {isExpanded && (
          <>
            <p className="recipe-card__times">
              <strong>Prep Time:</strong> {recipe.prepTime} |{" "}
              <strong>Cook Time:</strong> {recipe.cookTime}
            </p>
            <p className="recipe-card__description">{recipe.description}</p>
            <div className="recipe-card__ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li
                    key={index}
                  >{`${item.amount} ${item.unit} ${item.ingredient}`}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-card__directions">
              <strong>Directions:</strong>
              <ol>
                {recipe.directions
                  .sort((a, b) => a.stepOrder - b.stepOrder)
                  .map((step, index) => (
                    <li key={index}>{step.directionText}</li>
                  ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
