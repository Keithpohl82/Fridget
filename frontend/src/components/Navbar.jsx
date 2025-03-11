import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import "bulma/css/bulma.min.css"; // Import Bulma globally
import { useUser } from "../UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUser();

  // State for toggling the burger menu (mobile)
  const [isActive, setIsActive] = useState(false);

  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/userservice/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Construct profile picture URL
  const profilePictureURL =
    currentUser && currentUser.profilePicture
      ? `http://localhost:8080/${currentUser.profilePicture}`
      : "/default-avatar.png";

  return (
    // Use both your custom .navbar class and Bulma’s .navbar
    <nav
      className={`${styles.navbar} navbar`} 
      role="navigation"
      aria-label="main navigation"
    >
      {/* ============ NAVBAR BRAND (Left side + burger) ============ */}
      <div className="navbar-brand">
        {/* Home link or logo */}
        <Link to="/" className={`navbar-item ${styles.navbarLink}`}>
          Fridget Home
        </Link>

        {/* Hamburger button visible on mobile */}
        <button
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="fridgetNavbar"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* ============ NAVBAR MENU (collapsible area) ============ */}
      <div
        id="fridgetNavbar"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        {/* LEFT side: your nav links */}
        <div className={`navbar-start ${styles.navbarLinks}`}>
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
          <li className={styles.navbarItem}>
            <Link to="/recipelist" className={styles.navbarLink}>
              All Recipes
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/recipes" className={styles.navbarLink}>
              API Recipes
            </Link>
          </li>
        </div>

        {/* RIGHT side: user profile or Login */}
        <div className={`navbar-end ${styles.navbarRight}`}>
          {currentUser ? (
            // Dropdown or link for user info
            <div className={`dropdown is-hoverable ${styles.userInfo}`}>
              <div className={`dropdown-trigger ${styles.dropdownTrigger}`}>
                <button className={`button ${styles.dropdownButton}`}>
                  {/* Avatar */}
                  <img
                    src={profilePictureURL}
                    alt="Avatar"
                    className={`${styles.avatar} is-rounded`}
                  />
                  {/* Username */}
                  <Link to="/profile" className={styles.username}>
                    {currentUser.username}
                  </Link>
                  {/* Down arrow icon */}
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" />
                  </span>
                </button>
              </div>
              <div
                className={`dropdown-menu ${styles.dropdownMenu}`}
                role="menu"
              >
                <div className={`dropdown-content ${styles.dropdownContent}`}>
                  <Link
                    to="/profile"
                    className={`dropdown-item ${styles.dropdownItem}`}
                  >
                    My Profile
                  </Link>
                  <button
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className={styles.navbarLink}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
