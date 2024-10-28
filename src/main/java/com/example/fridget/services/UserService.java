package com.example.fridget.services;

import com.example.fridget.models.User;
import com.example.fridget.models.UserInventory;
import com.example.fridget.models.data.UserInventoryRepository;
import com.example.fridget.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInventoryRepository userInventoryRepository;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(User user) {
        user.setPwHash(encoder.encode(user.getPwHash()));
        UserInventory newInventory = new UserInventory();
        newInventory.setUserId(user);
        userRepository.save(user);
        userInventoryRepository.save(newInventory);
        //DiscordBot.postMessage(user.getFirstname() + " " + user.getLastname() + " Was added to the database");
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
}
