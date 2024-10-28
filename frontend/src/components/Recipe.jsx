import React from 'react'
import { useState } from 'react';

const Recipe = () => {
    const [name, setRecipeName] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [description, setDescription] = useState('');
    // const [ingredientsList, setIngredients] = useState(['']); // Start with one input field
    
// const handleAddInput = () => {
//   setIngredients([...ingredientsList, '']); // Add a new empty input field
// };
// const handleInputChange = (index, value) => {
//   const newIngredients = [...ingredientsList];
//   newIngredients[index] = value; // Update the specific input value
//   setIngredients(newIngredients);
// };

const handleSubmit = async (e) => {
    e.preventDefault();
    //this connects to the backend to call approprate method passing in the params.
    const response = await fetch(`http://localhost:8080/recipes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, cookTime, prepTime, description }),
    });
    const result = await response.text();
    alert(result);
  };
    return (
      <>
      <h2>Recipe Information</h2>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setRecipeName(e.target.value)}
        required
      />
        <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cook Time"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Prep Time"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        required
      />
    {/* <h2>Ingredients</h2>
    {ingredientsList.map((Ingredient, index) => (
      <input
        key={index}
        type="text"
        value={Ingredient}
        onChange={(e) => handleInputChange(index, e.target.value)}
        placeholder={`Ingredient ${index + 1}`}
      />
    ))}
      <button onClick={handleAddInput}>Add Ingredient</button> */}
     <br/> 
      <button type="submit">Add Recipe</button>
      </form>
    </>
  );
};

export default Recipe;
