package com.example.fridget.services;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.UserInventory;
import com.example.fridget.models.data.UserInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserInventoryService {

    @Autowired
    UserInventoryRepository userInventoryRepository;

    public void addIngredient(){


    }
}
