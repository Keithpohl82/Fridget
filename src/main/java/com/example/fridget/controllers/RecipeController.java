package com.example.fridget.controllers;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import com.example.fridget.models.data.RecipeRepository;
import com.example.fridget.services.FileStorageService;
import com.example.fridget.services.RecipeService;
import jakarta.servlet.http.HttpSession;
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

    @Autowired
    private UserController userController;

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
    public ResponseEntity<Map<String, Object>> addNewRecipe(@RequestBody Recipe recipe,
                                                            HttpSession session) {
        try {
            // Sets user to current logged in user.
            User user = (User) session.getAttribute("user");
            System.out.println(user.getUsername() + " tried to save this recipe");
            // Calculate total time for the recipe
            recipe.setTotalTime(recipe.getCookTime() + recipe.getPrepTime());

            if(user != null) {
                recipe.setCreator(user.getId());
            } else {
                recipe.setCreator(99999L);
            }
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
            Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));

            // Delete the old photo if it exists
            String oldPhotoPath = recipe.getPhotoPath();
            if (oldPhotoPath != null && !oldPhotoPath.isBlank()) {
                fileStorageService.deleteFile("uploads/" + oldPhotoPath);
            }

            // Save the new photo
            String filePath = fileStorageService.saveFile(file, "recipe-photos");
            recipe.setPhotoPath(filePath);
            recipeRepository.save(recipe);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Recipe photo uploaded successfully");
            response.put("photoPath", filePath);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error uploading file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


}
