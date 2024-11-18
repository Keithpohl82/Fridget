package com.example.fridget.controllers;

import com.example.fridget.dtos.UserDTO;
import com.example.fridget.models.User;
import com.example.fridget.models.UserProfile;
import com.example.fridget.models.data.UserRepository;
import com.example.fridget.services.FileStorageService;
import com.example.fridget.services.UserProfileService;
import com.example.fridget.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/userservice")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private FileStorageService fileStorageService;

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

        // Fetch user by username
        User user = userService.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Include the user's profile picture or a default one
        String profilePicture = user.getProfilePicturePath();
        if (profilePicture == null || profilePicture.isEmpty()) {
            profilePicture = "https://via.placeholder.com/150"; // Replace with your desired default avatar URL
        }

        // Return the full user object or a DTO with required fields
        UserDTO userDTO = new UserDTO(
                user.getId(),                     // Include the user ID
                user.getUsername(),
                profilePicture,
                user.getUserEmail(),
                user.getUserProfile().getUserbio()    // Example: Include bio from UserProfile if available
        );

        return ResponseEntity.ok(userDTO);
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

    @PostMapping("/{id}/upload-profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Fetch the user from the database
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            // Delete the old profile picture if it exists
            if (user.getProfilePicturePath() != null) {
                String oldFilePath = user.getProfilePicturePath();
                fileStorageService.deleteFile(oldFilePath);
            }

            // Save the new profile picture
            String filePath = fileStorageService.saveFile(file, "profile-pictures");
            user.setProfilePicturePath(filePath);
            userRepository.save(user);

            return ResponseEntity.ok("Profile picture uploaded successfully. Path: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        }
    }



}
