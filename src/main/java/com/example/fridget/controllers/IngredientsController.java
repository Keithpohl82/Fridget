package com.example.fridget.controllers;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.data.IngredientsRepository;
import com.example.fridget.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("ingredients")
public class IngredientsController {

    @Autowired
    IngredientsRepository ingredientsRepository;
    @Autowired
    IngredientService ingredientService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("add")
    public ResponseEntity<String> addNewIngredient(@RequestBody Ingredients ingredient){
    ingredientService.addIngredient(ingredient);
        return ResponseEntity.ok( ingredient.getName() + " added successfully");
    }
}
