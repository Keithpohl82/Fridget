package com.example.fridget.controllers;


import com.example.fridget.models.Recipe;
import com.example.fridget.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @GetMapping("/")
    public ResponseEntity<List<Recipe>> index() {
        List<Recipe> recipes = recipeService.getRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }


    @PostMapping("add")
    public ResponseEntity<String> addNewRecipe(@RequestBody Recipe recipe){
        recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());
        System.out.println(recipe.toString());
        System.out.println(recipe.getCreator());
        recipeService.addNewRecipe(recipe);
    return ResponseEntity.ok( recipe.getName() + " added successfully");
    }
}
