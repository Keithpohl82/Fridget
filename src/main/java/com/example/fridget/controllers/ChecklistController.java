package com.example.fridget.controllers;

import com.example.fridget.dtos.ChecklistDTO;
import com.example.fridget.models.Checklist;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import com.example.fridget.models.data.ChecklistRepository;
import com.example.fridget.models.data.UserRepository;
import com.example.fridget.services.ChecklistService;
import com.example.fridget.services.UserService;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("checklist")
public class ChecklistController {

    private final ChecklistService checklistService;

    @Autowired
    ChecklistRepository checklistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PostMapping("user/add")
    public ResponseEntity<Checklist> createChecklist(@RequestBody ChecklistDTO checklistRequest) {

        User user = userRepository.findById(checklistRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Checklist checklist = new Checklist();
        checklist.setUser(user);
        checklist.setListname(checklistRequest.getListname());
        checklist.setListitem(checklistRequest.getListitem() != null ? checklistRequest.getListitem() : new ArrayList<>());

        return new ResponseEntity<>(checklistRepository.save(checklist), HttpStatus.CREATED);
    }
}