// src/SelectForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectForm = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ingredients/list');
        setOptions(response.data); // Adjust according to your data structure
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form>
      <label htmlFor="select">Choose an option:</label>
      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} {/* Adjust according to your data structure */}
          </option>
        ))}
      </select>
      <button type="submit">Add Ingredient</button>
    </form>
  );
};

export default SelectForm;
