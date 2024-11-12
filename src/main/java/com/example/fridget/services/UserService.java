package com.example.fridget.services;

import com.example.fridget.models.PasswordResetToken;
import com.example.fridget.models.User;
import com.example.fridget.models.data.PasswordResetTokenRepository;
import com.example.fridget.models.data.UserRepository;
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
    private PasswordResetTokenRepository tokenRepository;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(User user) {
        System.out.println(user.getUserEmail());
        user.setPwHash(encoder.encode(user.getPwHash()));
        userRepository.save(user);
        // DiscordBot.postMessage(user.getFirstname() + " " + user.getLastname() + " Was added to the database");
    }

    public Optional<User> loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
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

            // Return the token for testing (secure handling needed for production)
            return token;
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
}