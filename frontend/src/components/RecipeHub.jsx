import React from 'react';
import { Link } from 'react-router-dom';

const RecipePage = () => {
  return (
    <div className="container mt-5">
      <h1 className="title is-2">Recipe Dashboard</h1>
      <div className="box">
        <h2 className="title is-4">What would you like to do?</h2>
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="buttons are-medium is-fullwidth">
              <Link to="/add-recipe" className="button is-primary is-fullwidth">
                Add Recipe
              </Link>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="buttons are-medium is-fullwidth">
              <Link to="/saved-recipes" className="button is-link is-fullwidth">
                Saved Recipes
              </Link>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="buttons are-medium is-fullwidth">
              <Link to="/my-recipes" className="button is-info is-fullwidth">
                My Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
