package com.example.fridget.services;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.data.IngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class IngredientService {

    @Autowired
    IngredientsRepository ingredientsRepository;

    public void addIngredient(Ingredients ingredient){

        ingredientsRepository.save(ingredient);
    }
}
