import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard'; // Adjust the import path as needed

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/recipes/')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    return (
        <div className="recipe-list">
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;
