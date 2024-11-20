package com.example.fridget.controllers;

import com.example.fridget.dtos.GroceryListDTO;
import com.example.fridget.models.Ingredients;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import com.example.fridget.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("grocery-list")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class GroceryListController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<List<Ingredients>> getGroceryList(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user.getGrocerylist());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("addlist")
    public ResponseEntity<String> addNewGroceryList(@RequestBody GroceryListDTO groceryListDTO) {
        Long userid = groceryListDTO.getUserid();
        List<Ingredients> items = groceryListDTO.getItems();

        User user = userService.getUserById(userid);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setGrocerylist(items); // Assuming `setGrocerylist` persists the list
        userService.updateUser(user); // Save user with updated grocery list

        return ResponseEntity.ok("List saved");
    }
}
