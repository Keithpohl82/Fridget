import { useState, useEffect } from "react";
import styles from "../styles/Grocery.module.css";
import { useUser } from "../UserContext";

export default function GroceryList() {
  const [listitem, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [listname, setHeading] = useState("My Grocery List");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const { currentUser, setUser } = useUser();
  const [userId, setUserId] = useState();
  
  

  useEffect(() => {
    if(currentUser){
      var id = currentUser.id;
    setUserId(id);
    console.log(id);
    }
    
  }, [currentUser]);


  const handleSaveList = async (e) => {
    e.preventDefault();
    
    // Connect to the backend and send the ingredient name
    const response = await fetch(`http://localhost:8080/checklist/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      //list item needs to be an object 
      body: JSON.stringify({
        userId,
        listname,
        listitem: listitem.map(item => ({
            listitem: item.text || item,
            iscomplete: item.checked || false
        }))
    }),
    });

    const result = await response.text();
    alert(result);

  };


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
    }
    const newIngredient = inputValue
    setItems((prevItems) => {
      const updatedItems = [...prevItems, newIngredient];
      console.log(updatedItems); // This will now log the updated state
      return updatedItems;
    });
    setInputValue("");
  };

  const removeItem = (index) => {
    setItems(listitem.filter((_, i) => i !== index));
  };

  const toggleChecked = (index) => {
    setItems((prevItems) =>
        prevItems.map((item, i) =>
            i === index ? { ...item, checked: !item.checked } : item
        )
    );
};

  return (
    <div className={styles.groceryBackground}>
      <div className={styles.body} id={styles.rcorners2}>
        <div id="myDIV" className={styles.header}>
        
          {/* Editable Heading with Pencil Icon */}
          {isEditingTitle ? (
            <input
              type="text"
              value={listname}
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
              {listname} <span className={styles.editIcon}>✏️</span>
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
          <span onClick={handleSaveList} className={styles.addBtn}>
            Save list
          </span>
        </div>

        <ul id="myUL" className={styles.ul}>
          {listitem.map((item, index) => (
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
