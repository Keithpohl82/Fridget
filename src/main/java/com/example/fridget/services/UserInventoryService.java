package com.example.fridget.services;


import com.example.fridget.models.data.UserInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;



@Service
public class UserInventoryService {

    @Autowired
    UserInventoryRepository userInventoryRepository;

    public void addIngredient(){

    }
}
