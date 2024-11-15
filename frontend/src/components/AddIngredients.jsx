import { useState } from "react";
import "bulma/css/bulma.min.css";

const AddIngredients = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Connect to the backend and send the ingredient name
    const response = await fetch(`http://localhost:8080/ingredients/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.text();
    alert(result);

    // Clear the input field after submission
    setName("");
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <h2 className="title is-4 has-text-centered">Add New Ingredient</h2>
        <form onSubmit={handleSubmit}>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Enter ingredient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                Add Ingredient
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIngredients;
