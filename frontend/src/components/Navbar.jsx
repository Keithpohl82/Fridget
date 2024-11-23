import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import useCurrentUser from "../useCurrentUser";




const Navbar = () => {
  const navigate = useNavigate();
  const {user, loading, hookError} = useCurrentUser();
  

  const logoutUser = async () => {
   
    try {
      const response = await fetch("http://localhost:8080/userservice/logout", {
        method: "POST",
        credentials: "include", // Ensures session cookies are sent
      });
      if (response.ok) {
        //refreshUser(); // Refresh user state
        useCurrentUser(null);
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to log out");
      }
    } catch (hookError) {
      console.error("Error logging out:", hookError);
    }
  };

  // Construct profile picture URL
  const profilePictureURL =
    user && user.profilePicture
      ? `http://localhost:8080/${user.profilePicture}` // Use backend-served image
      : "/default-avatar.png"; // Fallback to default avatar

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
      </ul>

      <div className={styles.navbarRight}>
        {user ? (
          <div className={`dropdown is-right is-hoverable ${styles.userInfo}`}>
            <div className={`dropdown-trigger ${styles.dropdownTrigger}`}>
              <button className={`button ${styles.dropdownButton}`}>
                <span>
                  <img
                    src={profilePictureURL} // Updated profile picture URL
                    alt="Avatar"
                    className={`${styles.avatar} is-rounded`}
                  />
                </span>
                <Link to="/profile">
                  <span>{user.username}</span>
                </Link>
                <span className="icon is-small">
                  <i className="fas fa-angle-down"></i>
                </span>
              </button>
            </div>
            <div className={`dropdown-menu ${styles.dropdownMenu}`} role="menu">
              <div className="dropdown-content">
                <Link to="/profile" className={`dropdown-item ${styles.dropdownItem}`}>
                  My Profile
                </Link>
                <button className={`dropdown-item ${styles.dropdownItem}`} onClick={logoutUser}>
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
    </nav>
  );
};

export default Navbar;
