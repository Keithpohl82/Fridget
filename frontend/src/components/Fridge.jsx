import { useState } from 'react';
import styles from '../styles/Fridge.module.css'; // Assuming you have a CSS module for styling

const AddIngredients = () => {
  const [name, setName] = useState(''); // For custom ingredient input
  const [addedItems, setAddedItems] = useState([]); // To keep track of added items

  // List of predefined food items with icons
  const foodItems = [
    { name: "Apple", icon: "🍎" },
    { name: "Milk", icon: "🥛" },
    { name: "Bread", icon: "🍞" },
    { name: "Cheese", icon: "🧀" },
    { name: "Egg", icon: "🥚" },
    { name: "Carrot", icon: "🥕" },
    { name: "Pizza", icon: "🍕" },
  ];

  // Handle adding custom ingredient from input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return; // Prevent adding empty ingredient

    // Add custom ingredient directly to the virtual fridge (center box)
    setAddedItems([...addedItems, { name, icon: "🛒" }]); // "🛒" is a placeholder icon for custom items
    
    // Call the backend to add ingredient (optional, depends on whether you need the backend integration)
    const response = await fetch(`http://localhost:8080/ingredients/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.text();
    alert(result);

    setName(''); // Clear input field after submitting
  };

  // Handle adding predefined food items to the center box
  const handleAddFoodItem = (item) => {
    setAddedItems([...addedItems, item]);
  };

  // Remove item from the addedItems list
  const handleRemoveItem = (itemName) => {
    setAddedItems(addedItems.filter(item => item.name !== itemName));
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Central Box for Added Items */}
        <div className={styles.centerBox}>
          <h3>Virtual Box</h3>
          {addedItems.length > 0 ? (
            <div className={styles.itemsList}>
              {addedItems.map((item, index) => (
                <div key={index} className={styles.item}>
                  <span>{item.icon} {item.name}</span>
                  <button 
                    className={styles.removeButton} 
                    onClick={() => handleRemoveItem(item.name)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No items added yet. Choose some ingredients!</p>
          )}
        </div>

        {/* Right Side - Add Ingredient Input & Food Item Selection */}
        <div className={styles.sidebar}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Enter custom ingredient"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit">Add Ingredient</button>
          </form>

          <div className={styles.foodSelection}>
            <h3>Choose Food Item</h3>
            <div className={styles.foodItems}>
              {foodItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.foodButton}
                  onClick={() => handleAddFoodItem(item)}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIngredients;
