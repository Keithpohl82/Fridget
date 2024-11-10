package com.example.fridget.controllers;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeDirectionsRepo;
import com.example.fridget.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("recipes")
public class RecipeController {

    @Autowired
    RecipeService recipeService;
    @Autowired
    RecipeDirectionsRepo recipeDirectionsRepo;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/")
    public ResponseEntity<List<Recipe>> index() {
        List<Recipe> recipes = recipeService.getRecipes();
        return ResponseEntity.ok(recipes);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("add")
    public ResponseEntity<String> addNewRecipe(@RequestBody Recipe recipe){
        recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());
        System.out.println(recipe.toString());
        System.out.println("This should be a list of steps" + recipe.getSteps());

        recipeService.addNewRecipe(recipe);
    return ResponseEntity.ok( recipe.getName() + " added successfully");
    }
}
