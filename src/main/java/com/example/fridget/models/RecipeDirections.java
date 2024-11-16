package com.example.fridget.models;

import jakarta.persistence.*;

@Entity
public class RecipeDirections {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String directionText;
    private int stepOrder;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public RecipeDirections(String directionText, int stepOrder) {
        this.directionText = directionText;
        this.stepOrder = stepOrder;
    }

    public RecipeDirections() {
    }

    public String getDirectionText() {
        return directionText;
    }

    public void setDirectionText(String directionText) {
        this.directionText = directionText;
    }

    public int getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(int stepOrder) {
        this.stepOrder = stepOrder;
    }
}
