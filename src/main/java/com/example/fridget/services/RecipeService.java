package com.example.fridget.services;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;


    public void addNewRecipe(Recipe recipe){

        recipeRepository.save(recipe);

    }
}
