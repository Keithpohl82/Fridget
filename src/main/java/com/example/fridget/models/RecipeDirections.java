package com.example.fridget.models;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("RecipeDirections")
public class RecipeDirections extends Recipe {

    @ElementCollection()
    @CollectionTable(name = "recipe_directions", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "recipeSteps")
    private List<String> recipeSteps;

    public RecipeDirections() {
    }

    public RecipeDirections(List<String> recipeSteps) {
        this.recipeSteps = recipeSteps;
    }

    public List<String> getRecipeSteps() {
        return recipeSteps;
    }

    public void setRecipeSteps(List<String> recipeSteps) {
        this.recipeSteps = recipeSteps;
    }

    public Long getId() {
        return super.getId();
    }

}
