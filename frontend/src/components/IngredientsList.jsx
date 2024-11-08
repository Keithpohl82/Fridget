import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IngredientsList = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ingredients/list');
        console.log(response.data);
        setEntities(response.data);
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
        {entities.map(entity => (
          <li key={entity.id}>{entity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;