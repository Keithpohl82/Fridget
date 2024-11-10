import { useState } from 'react';

const AddIngredients = () => {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //this connects to the backend to call approprate method passing in the params.
    const response = await fetch(`http://localhost:8080/ingredients/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <button type="submit">Add Ingredient</button>
    </form>
    </>
  );
};
export default AddIngredients;