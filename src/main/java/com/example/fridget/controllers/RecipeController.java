package com.example.fridget.controllers;


import com.example.fridget.models.Ingredients;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("recipes")
public class RecipeController {

    @Autowired
    RecipeRepository recipeRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("add")
    public ResponseEntity<String> addNewRecipe(@RequestBody Recipe recipe){
        recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());
        recipeRepository.save(recipe);
    return ResponseEntity.ok( recipe.getName() + " added successfully");
    }
}
