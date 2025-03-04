package com.example.fridget.services;

import com.example.fridget.controllers.UserController;
import com.example.fridget.dtos.ChecklistDTO;
import com.example.fridget.models.Checklist;
import com.example.fridget.models.User;
import com.example.fridget.models.data.ChecklistRepository;
import com.example.fridget.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final UserRepository userRepository;

    public ChecklistService(ChecklistRepository checklistRepository, UserRepository userRepository) {
        this.checklistRepository = checklistRepository;
        this.userRepository = userRepository;
    }

    public Checklist createChecklist(ChecklistDTO checklistRequest) {
        // Find the user by ID
        User user = userRepository.findById(checklistRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Checklist entity
        Checklist checklist = new Checklist();
        checklist.setUser(user);
        checklist.setListname(checklistRequest.getListname());
        checklist.setListitem(checklistRequest.getListitem());

        // Save the checklist
        return checklistRepository.save(checklist);
    }
}
