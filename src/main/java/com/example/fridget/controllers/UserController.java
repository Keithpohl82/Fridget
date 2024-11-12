package com.example.fridget.controllers;

import com.example.fridget.models.User;
import com.example.fridget.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok(user.getUsername() + " registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password, HttpSession session) {

        return userService.loginUser(username, password)
                .map(user -> {
                    // Store user information in session
                    session.setAttribute("username", user.getUsername());
                    return ResponseEntity.ok(session.getAttribute("username ") + "logged in");
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(null); // Unauthorized if no user is found
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate(); // Ends the session and clears the attributes
        return ResponseEntity.ok("Logout successful");
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String username) {
        String token = userService.initiatePasswordReset(username);
        if (token != null) {
            return ResponseEntity.ok("Password reset token: " + token);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean result = userService.resetPassword(token, newPassword);
        if (result) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired token");
        }
    }
}