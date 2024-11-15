import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toggle mobile menu
  useEffect(() => {
    const navbarBurger = document.querySelector(".navbar-burger");
    const navbarMenu = document.querySelector(".navbar-menu");

    navbarBurger.addEventListener("click", () => {
      navbarBurger.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    });
  }, []);

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container" style={{ paddingLeft: "1rem" }}> {/* Adding padding to container */}
        <div className="navbar-brand">
          <Link 
            to="/" 
            className="navbar-item"
            style={{ marginLeft: "0.5rem" }} // Adding a small margin to fix the cut-off
          >
            <strong>Fridget Home</strong>
          </Link>
          {/* Burger menu for mobile */}
          <button
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/ingredients" className="navbar-item">
              Ingredients
            </Link>
            <Link to="/recipe" className="navbar-item">
              Recipe
            </Link>
            <Link to="/password-reset" className="navbar-item">
              Password Reset
            </Link>
            <Link to="/grocery-list" className="navbar-item">
              Grocery List
            </Link>
            <Link to="/fridge" className="navbar-item">
              Fridge
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/profile" className="button is-light">
                  Profile
                </Link>
                <Link to="/login" className="button is-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
