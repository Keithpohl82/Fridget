import React, { useState } from 'react';
import SelectForm from './SelectForm';
import AddStep from './Directions';

const Recipe = () => {
    const [name, setRecipeName] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setDirections] = useState(['']);
    const [ingredients, setIngredients] = useState([]);

    const addIngredient = (ingredient) => {
        setIngredients((prevIngredient) => [...prevIngredient, { id: ingredient }]);
    };

    const handleAddStep = (newStep) => {
        setDirections([... steps,newStep]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/recipes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                
                    name,
                    cookTime,
                    prepTime,
                    description,
                    steps,
                    ingredients: ingredients
            }),
        });
        const result = await response.text();
        alert(result);
    };

    return (
        <>
            <h2>Recipe Information</h2>
            <form onSubmit={handleSubmit}>
            <input
                    type="file"
                    placeholder='photo'
                />
                <br/>
                <input
                    type="text"
                    placeholder="Recipe Name"
                    value={name}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                    name='Recipe Name'
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    name='Description'
                />
                <input
                    type="number"
                    placeholder="Cook Time"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    required
                    name='Cook Time'
                />
                <input
                    type="number"
                    placeholder="Prep Time"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    required
                    name='Prep Time'
                />
                <br/>
                <button type="submit" disabled={ingredients.length === 0}>Add Recipe</button>
            </form>
            <h2>Recipe Ingredients</h2>
            <SelectForm addIngredient={addIngredient} />
                <ul>
                    {ingredients.map((ingredient, index) => ( 
                        <li key={index}>{ingredient.id}</li>
                    ))}
                </ul>
            <h2>Directions</h2>
            <AddStep onAddStep={handleAddStep} />
                <ol>
                    {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                    ))}
                </ol>
        </>
    );
};

export default Recipe;