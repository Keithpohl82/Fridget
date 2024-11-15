package com.example.fridget.controllers;

import com.example.fridget.dtos.UserDTO;
import com.example.fridget.models.User;
import com.example.fridget.models.UserProfile;
import com.example.fridget.services.UserProfileService;
import com.example.fridget.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userservice")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.userExistsByEmail(user.getUserEmail())) {
            return ResponseEntity.status(400).body("A user with this email already exists.");
        }
        userService.registerUser(user);
        userProfileService.createProfile(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String identifier, @RequestParam String password, HttpSession session) {
        return userService.loginUser(identifier, password)
                .map(user -> {
                    // Store user information in session
                    session.setAttribute("username", user.getUsername());
                    System.out.println("Session set for username: " + user.getUsername()); // Debugging log
                    return ResponseEntity.ok("Login successful");
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String username) {
        String token = userService.initiatePasswordReset(username);
        if (token != null) {
            return ResponseEntity.ok("Password reset link sent to your email.");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean result = userService.resetPassword(token, newPassword);
        if (result) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired token");
        }
    }
    @GetMapping("/check-username")
    public ResponseEntity<String> checkUsernameAvailability(@RequestParam String username) {
        if (userService.userExistsByUsername(username)) {
            return ResponseEntity.ok("Username is already taken");
        } else {
            return ResponseEntity.ok("Username is available");
        }
    }
    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(401).body("No user logged in");
        }

        User user = userService.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Temporary default avatar placeholder
        String avatar = "https://fontawesome.com/icons/paypal?f=brands&s=solid"; // Replace with an actual default avatar URL if desired

        return ResponseEntity.ok(new UserDTO(user.getUsername(), avatar));
    }

    @PutMapping("/update-email")
    public ResponseEntity<String> updateEmail(@RequestParam String newEmail, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        try {
            boolean success = userService.updateEmail(username, newEmail);
            if (success) {
                return ResponseEntity.ok("Email updated successfully");
            } else {
                return ResponseEntity.status(400).body("Failed to update email");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
