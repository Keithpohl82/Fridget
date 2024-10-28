import React from 'react'
import { useState } from 'react';

const Recipe = () => {
    const [name, setRecipeName] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [description, setDescription] = useState('');
    const [inputs, setInputs] = useState(['']); // Start with one input field
    
const handleAddInput = () => {
      setInputs([...inputs, '']); // Add a new empty input field
};
const handleInputChange = (index, value) => {
  const newInputs = [...inputs];
  newInputs[index] = value; // Update the specific input value
  setInputs(newInputs);
};

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
      <button type="submit">Add Recipe</button>
    </form>
    <div>
    <h2>Dynamic Input Fields</h2>
    {inputs.map((input, index) => (
      <input
        key={index}
        type="text"
        value={input}
        onChange={(e) => handleInputChange(index, e.target.value)}
        placeholder={`Input ${index + 1}`}
      />
    ))}
    <button onClick={handleAddInput}>Add Input</button>
  </div>
  </>
  );
};

export default Recipe;
