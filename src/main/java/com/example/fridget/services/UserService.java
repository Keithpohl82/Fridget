package com.example.fridget.services;

import com.example.fridget.models.PasswordResetToken;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import com.example.fridget.models.UserProfile;
import com.example.fridget.models.data.PasswordResetTokenRepository;
import com.example.fridget.models.data.UserProfileRepository;
import com.example.fridget.models.data.UserRepository;
import com.example.fridget.services.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService; // New dependency for email service



    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(User user) {
        user.setPwHash(encoder.encode(user.getPwHash()));

        userRepository.save(user);

    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> loginUser(String identifier, String password) {
        Optional<User> userOpt;

        if (identifier.contains("@")) {
            // Assume identifier is an email
            userOpt = userRepository.findByUserEmail(identifier);
        } else {
            // Assume identifier is a username
            userOpt = userRepository.findByUsername(identifier);
        }

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (encoder.matches(password, user.getPwHash())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public String initiatePasswordReset(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            String token = UUID.randomUUID().toString();
            LocalDateTime expiry = LocalDateTime.now().plusMinutes(30);

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUsername(username);
            resetToken.setExpiry(expiry);

            tokenRepository.save(resetToken);

            String resetLink = "http://localhost:5173/password-reset?token=" + token; // Update to use frontend URL
            String emailBody = "Click the following link to reset your password: " + resetLink;

            // Send the email with the reset link
            emailService.sendEmail(userOpt.get().getUserEmail(), "Password Reset Request", emailBody);

            return token; // Return token for testing (optional)
        }
        return null;
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent()) {
            PasswordResetToken resetToken = tokenOpt.get();
            if (resetToken.getExpiry().isAfter(LocalDateTime.now())) {
                Optional<User> userOpt = userRepository.findByUsername(resetToken.getUsername());
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    user.setPwHash(encoder.encode(newPassword));
                    userRepository.save(user);
                    tokenRepository.deleteByToken(token);
                    return true;
                }
            }
        }
        return false;
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.findByUserEmail(email).isPresent();
    }
    public boolean userExistsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
