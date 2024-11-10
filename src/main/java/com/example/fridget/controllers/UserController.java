package com.example.fridget.controllers;

import com.example.fridget.models.User;
import com.example.fridget.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:5173") // this is to connect to the react app and port may need to be changed
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok( user.getUsername() + " User registered successfully");
    }

    //This method will need a redirect to a different page
    @CrossOrigin(origins = "http://localhost:5173") // this is to connect to the react app and port may need to be changed
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        return userService.loginUser(username, password)
                .map(user -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    @GetMapping("/{id}")
    @ResponseBody
    public User getUser(@PathVariable int id){
        return userService.getUserById(id);
    }
}