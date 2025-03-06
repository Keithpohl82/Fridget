package com.example.fridget.services;

import com.example.fridget.controllers.UserController;
import com.example.fridget.dtos.ChecklistDTO;
import com.example.fridget.models.Checklist;
import com.example.fridget.models.User;
import com.example.fridget.models.data.ChecklistRepository;
import com.example.fridget.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Checklist createChecklist(Checklist checklistRequest) {
        if (checklistRequest.getUser() == null || checklistRequest.getUser().getId() == null) {
            throw new RuntimeException("User ID is missing in the request");
        }

        System.out.println("User ID: " + checklistRequest.getUser().getId());
        System.out.println("List Name: " + checklistRequest.getListname());
        System.out.println("List Items: " + checklistRequest.getListitem());

        // Find the user by ID
        User user = userRepository.findById(checklistRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and populate Checklist entity
        Checklist checklist = new Checklist();
        checklist.setUser(user);
        checklist.setListname(checklistRequest.getListname());

        // Ensure listitem is not null before saving
        checklist.setListitem(checklistRequest.getListitem() != null ? checklistRequest.getListitem() : new ArrayList<>());

        // Save the checklist
        return checklistRepository.save(checklist);
    }
}
