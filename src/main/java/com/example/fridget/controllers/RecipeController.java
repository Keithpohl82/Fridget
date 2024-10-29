package com.example.fridget.controllers;

import com.example.fridget.models.Recipe;
import com.example.fridget.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("recipes")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("add")
    public ResponseEntity<String> addNewRecipe(@RequestBody Recipe recipe){
        recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());
        System.out.printf("this is from the recipecontroller");
        recipeService.addNewRecipe(recipe);
    return ResponseEntity.ok( recipe.getName() + " added successfully");
    }


}
