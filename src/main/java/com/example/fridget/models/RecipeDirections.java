package com.example.fridget.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Embeddable
public class RecipeDirections {

    private String directionText;
    @JsonBackReference
    private int stepOrder;

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

    public RecipeDirections(String directionText, int stepOrder) {
        this.directionText = directionText;
        this.stepOrder = stepOrder;
    }
}
