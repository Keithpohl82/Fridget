import { useState } from "react";
import styles from "../styles/Grocery.module.css";

export default function GroceryList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [heading, setHeading] = useState("My Grocery List");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const addNewItem = () => {
    if (!inputValue.trim()) {
      alert("You must write something!");
      return;
    }else{
    const newIngredient = inputValue
    setItems((preItems)=>[...preItems, newIngredient]);
    setInputValue("");
    
    }
    console.log(items);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleChecked = (index) => {
    const newItems = [...items];
    newItems[index] = {
      text: newItems[index].text || newItems[index],
      checked: !newItems[index].checked,
    };
    setItems(newItems);
  };

  return (
    <div className={styles.groceryBackground}>
      <div className={styles.body} id={styles.rcorners2}>
        <div id="myDIV" className={styles.header}>
          {/* Editable Heading with Pencil Icon */}
          {isEditingTitle ? (
            <input
              type="text"
              value={heading}
              onChange={handleHeadingChange}
              onBlur={() => setIsEditingTitle(false)}
              className={styles.editableTitle}
              autoFocus
            />
          ) : (
            <h2
              onClick={() => setIsEditingTitle(true)}
              className={styles.title}
            >
              {heading} <span className={styles.editIcon}>✏️</span>
            </h2>
          )}

          <input
            type="text"
            id="myInput"
            placeholder="Ingredient..."
            value={inputValue}
            onChange={handleInputChange}
            className={styles.input}
          />
          <span onClick={addNewItem} className={styles.addBtn}>
            Add
          </span>
        </div>

        <ul id="myUL" className={styles.ul}>
          {items.map((item, index) => (
            <li
              key={index}
              className={item.checked ? styles.checked : ""}
              onClick={() => toggleChecked(index)}
            >
              {item.text || item}
              <span
                className={styles.close}
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(index);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
