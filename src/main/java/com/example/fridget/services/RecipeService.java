package com.example.fridget.services;


import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.IngredientsRepository;
import com.example.fridget.models.data.MeasurementsRepository;
import com.example.fridget.models.data.RecipeDirectionsRepo;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    RecipeDirectionsRepo recipeDirectionsRepo;
    @Autowired
    IngredientsRepository ingredientsRepository;
    @Autowired
    MeasurementsRepository measurementsRepository;

    public void addNewRecipe(Recipe recipe){
            System.out.println("step: " + recipe.getSteps());
        recipeRepository.save(recipe);
    }
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }
    public Recipe getRecipeById(Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.orElseThrow(() -> new RuntimeException("Recipe not found"));
    }
}
