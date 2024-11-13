
// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarLinks}>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>
            Home
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/login" className={styles.navbarLink}>
            Login
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/register" className={styles.navbarLink}>
            Register
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/user-container" className={styles.navbarLink}>
            User Container
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
          <Link to="/ingredients-list" className={styles.navbarLink}>
            Ingredients List
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/select-form" className={styles.navbarLink}>
            Select Form
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
      </ul>
    </nav>
  );
};

export default Navbar;
