package com.example.fridget.controllers;

import com.example.fridget.models.UserInventory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/inventory")
public class UserInventoryController {

    @CrossOrigin(origins = "http://localhost:5173") // this is to connect to the react app and port may need to be changed
    @PostMapping("/add")
    public ResponseEntity<String> addToInventory(@RequestBody UserInventory userInventory){

        return ResponseEntity.ok( " Ingredient Added to your inventory");
    }
}
