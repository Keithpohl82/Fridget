package com.example.fridget.services;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.RecipeDirections;
import com.example.fridget.models.data.MeasurementsRepository;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    MeasurementsRepository measurementsRepository;

    public void addNewRecipe(Recipe recipe){

        recipeRepository.save(recipe);
    }
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }

    public Page<Recipe> getRecipesForHome(int page, int size) {
        return recipeRepository.findAll(PageRequest.of(page, size));
    }

    public Recipe getRecipeById(Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.orElseThrow(() -> new RuntimeException("Recipe not found"));
    }
}
