import React, { useState } from "react";
import { Link } from "react-router-dom";
import book from '../Pictures/Recipe-Books.png';
import fridge from '../Pictures/fridge.png';
import cabinet from '../Pictures/cabinet.png';
import oven from '../Pictures/oven.png';
import styles from "../styles/Kitchen.module.css";

const InteractiveKitchen = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(null);

  const handleMouseEnter = (tooltipText) => setTooltipVisible(tooltipText);
  const handleMouseLeave = () => setTooltipVisible(null);

  return (
    <div className={styles.container}>
      {/* Kitchen Background Image */}
      <div className={styles.kitchenPhoto}>
        {/* Fridge Link with Icon */}
        <Link
          to="/fridge"
          className={styles.clickableArea}
          style={{ top: "10%", left: "60%", width: "15%", height: "35%" }}
          onMouseEnter={() => handleMouseEnter("Open the fridge to add ingredients!")}
          onMouseLeave={handleMouseLeave}
        >
          <img src={fridge} alt="Fridge Icon" className={styles.linkIcon} />
        </Link>

        {/* Recipe Book Link with Icon */}
        <Link
          to="/recipe"
          className={styles.clickableArea}
          style={{ top: "50%", left: "50%", width: "8%", height: "16%" }}
          onMouseEnter={() => handleMouseEnter("Check out the recipe book!")}
          onMouseLeave={handleMouseLeave}
        >
          <img src={book} alt="Recipe Book Icon" className={styles.linkIcon} />
        </Link>

        {/* Oven Link with Icon */}
        <Link
          to="/recipe"
          className={styles.clickableArea}
          style={{ top: "55%", left: "20%", width: "10%", height: "20%" }}
          onMouseEnter={() => handleMouseEnter("Baking in the oven!")}
          onMouseLeave={handleMouseLeave}
        >
          <img src={oven} alt="Oven Icon" className={styles.linkIcon} />
        </Link>

        {/* Cabinet Link with Icon */}
        <Link
          to="/pantry"
          className={styles.clickableArea}
          style={{ top: "5%", left: "5%", width: "12%", height: "25%" }}
          onMouseEnter={() => handleMouseEnter("Check your pantry!")}
          onMouseLeave={handleMouseLeave}
        >
          <img src={cabinet} alt="Cabinet Icon" className={styles.linkIcon} />
        </Link>
      </div>

      {/* Tooltip Display */}
      {isTooltipVisible && (
        <div className={styles.tooltip}>
          <p>{isTooltipVisible}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveKitchen;
