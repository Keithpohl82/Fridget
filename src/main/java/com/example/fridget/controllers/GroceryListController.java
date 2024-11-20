package com.example.fridget.controllers;

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
    public ResponseEntity<String> addNewGroceryList(@RequestBody User user){

        return ResponseEntity.ok("List saved");
    }
}
