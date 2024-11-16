import React, { useState } from 'react';

const RecipeCard = ({ name, cookTime, prepTime, description, directions, photoURL, ingredients, cuisine }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="recipe-card" onClick={handleToggleExpand}>
            <img src={photoURL} alt={`${name}`} className="recipe-card__image" />
            <div className="recipe-card__content">
                <h2 className="recipe-card__title">{name}</h2>
                <p className="recipe-card__cuisine"><strong>Cuisine:</strong> {cuisine}</p>
                {isExpanded && (
                    <>
                        <p className="recipe-card__times">
                            <strong>Prep Time:</strong> {prepTime} | <strong>Cook Time:</strong> {cookTime}
                        </p>
                        <p className="recipe-card__description">{description}</p>
                        <div className="recipe-card__ingredients">
                            <strong>Ingredients:</strong>
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="recipe-card__directions">
                            <strong>Directions:</strong>
                            <ol>
                                {directions.map((step, index) => (
                                    <li key={index}>{step}</li>
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