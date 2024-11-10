import React from "react";

import { UserContainer } from "./components/UserContainer";
import Ingredients from "./components/ingredients";
import Recipe from "./components/Recipe";
import IngredientsList from "./components/IngredientsList";
import SelectForm from "./components/SelectForm";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div className="container">
      <Login />
    </div>
  );
};

export default App;
