import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IngredientsList = () => {
  const [listOfingredients, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ingredients/list');
        
        setIngredientsList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Ingredients</h1>
      <ul>
        {listOfingredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.id} {ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;