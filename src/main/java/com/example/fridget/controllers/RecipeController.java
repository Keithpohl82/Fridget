package com.example.fridget.controllers;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeRepository;
import com.example.fridget.services.FileStorageService;
import com.example.fridget.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("recipes")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/")
    public ResponseEntity<List<Recipe>> index() {
        List<Recipe> recipes = recipeService.getRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("getall")
    public Page<Recipe> getRecipesForHome(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return recipeService.getRecipesForHome(page, size);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Recipe> getRecipe(@PathVariable Long id) {
        try {
            Recipe recipe = recipeService.getRecipeById(id);
            return ResponseEntity.ok(recipe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addNewRecipe(@RequestBody Recipe recipe) {
        try {
            // Calculate total time for the recipe
            recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());

            // Save the recipe
            recipeService.addNewRecipe(recipe);

            // Return a JSON response with the recipe ID and name
            Map<String, Object> response = new HashMap<>();
            response.put("id", recipe.getId());
            response.put("name", recipe.getName());
            response.put("message", recipe.getName() + " added successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Use Map<String, Object> for error responses
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to add recipe: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }


    @PostMapping("/{id}/upload-photo")
    public ResponseEntity<Map<String, String>> uploadRecipePhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            System.out.println("Uploading photo for recipe ID: " + id); // Debug log for ID

            // Validate that the recipe exists
            Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));
            System.out.println("Found recipe: " + recipe.getName()); // Debug log for Recipe

            // Save the file
            String filePath = fileStorageService.saveFile(file, "recipe-photos");
            System.out.println("Saved file at path: " + filePath); // Debug log for file path

            // Update the recipe with the photo path
            recipe.setPhotoPath(filePath);
            recipeRepository.save(recipe);
            System.out.println("Updated recipe with photo path"); // Debug log for update

            // Return success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Recipe photo uploaded successfully");
            response.put("photoPath", filePath);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            System.err.println("Error uploading file: " + e.getMessage()); // Debug log for IOException
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error uploading file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (RuntimeException e) {
            System.err.println("Error: " + e.getMessage()); // Debug log for Recipe not found
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

}
