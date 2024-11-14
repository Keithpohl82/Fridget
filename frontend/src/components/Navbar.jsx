import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarLinks}>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>
            Fridget Home
          </Link>
        </li>
        
        <li className={styles.navbarItem}>
          <Link to="/ingredients" className={styles.navbarLink}>
            Ingredients
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/recipe" className={styles.navbarLink}>
            Recipe
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/password-reset" className={styles.navbarLink}>
            Password Reset
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/grocery-list" className={styles.navbarLink}>
            Grocery List
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/fridge" className={styles.navbarLink}>
            Fridge
          </Link>
        </li>
      </ul>
      

      <div className={styles.navbarRight}>
      <li className={styles.navbarItem}>
        <Link to="/profile" className={styles.navbarLink}>
          Profile
        </Link>
      </li>
        <Link to="/login" className={styles.navbarLink}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
