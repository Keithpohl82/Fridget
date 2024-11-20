package com.example.fridget.services;

import com.example.fridget.models.Recipe;

import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    public void addNewRecipe(Recipe recipe){
        recipe.setDateCreated(LocalDate.now());
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
