package com.example.fridget.services;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.Recipe;
import com.example.fridget.models.data.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    public void addNewRecipe(Recipe recipe){
            System.out.println("step: " + recipe.getSteps());

        recipeRepository.save(recipe);
    }
}
