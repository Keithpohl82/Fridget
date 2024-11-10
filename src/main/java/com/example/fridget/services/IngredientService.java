package com.example.fridget.services;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.data.IngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;


@Service
public class IngredientService {

    @Autowired
    IngredientsRepository ingredientsRepository;

    public void addIngredient(Ingredients ingredient){

        ingredientsRepository.save(ingredient);
    }

    public boolean ingredientExistsByName(String name) {
        return ingredientsRepository.existsByName(name.toLowerCase());
    }
}
