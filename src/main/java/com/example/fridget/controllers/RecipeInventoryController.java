package com.example.fridget.controllers;


import com.example.fridget.models.RecipeInventory;
import com.example.fridget.models.data.RecipeInventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class RecipeInventoryController {

    @Autowired
    RecipeInventoryRepo recipeInventoryRepo;

    public ResponseEntity<RecipeInventory> createRecipeInventory(@RequestBody RecipeInventory recipeInventory) {


        System.out.println("Received Recipe Inventory: " + recipeInventory.toString());

        recipeInventoryRepo.save(recipeInventory);
        return ResponseEntity.ok(recipeInventory);
    }
}
