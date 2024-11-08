package com.example.fridget.services;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    public void addNewRecipe(Recipe recipe){
        for(Ingredients ingredient : recipe.getIngredients()){
            System.out.println("Ingredient name: " + ingredient.getName() + ", " + "Ingredient id: " + ingredient.getId());
        }
        recipeRepository.save(recipe);
    }
}
