import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from './Recipe';

const SelectForm = ({ addIngredient }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ingredients/list');
        setOptions(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
        addIngredient(selectedOption); // Call the passed function to add the ingredient
        setSelectedOption(''); // Clear the selection after adding
      }
  }

  return (
    //Need a handleSubmit function that will add selectedOption to a list on recipe to be submitted to backend.
    <form onSubmit={handleSubmit}>
      <label htmlFor="select">Choose an option:</label>
      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Ingredient</button>
    </form>
  );
};

export default SelectForm;
