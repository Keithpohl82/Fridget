package com.example.fridget.services;

import com.example.fridget.controllers.RecipeInventoryController;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.RecipeInventory;
import com.example.fridget.models.data.RecipeInventoryRepo;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    RecipeInventoryRepo recipeInventoryRepo;
    @Autowired
    RecipeInventoryController invenController;

    public void addNewRecipe(Recipe recipe){

        RecipeInventory ingredientList = new RecipeInventory();
        ingredientList.setRecipeId(recipe);
        invenController.createRecipeInventory(ingredientList);
        recipeRepository.save(recipe);
        recipeInventoryRepo.save(ingredientList);
    }
}
