package com.example.fridget.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Embeddable
public class Ingredients {

        @JsonBackReference
        private String ingredient;
        private String amount;
        private String unit;


        public String getIngredient() {
            return ingredient;
        }

        public void setIngredient(String ingredient) {
            this.ingredient = ingredient;
        }

        public String getAmount() {
            return amount;
        }

        public void setAmount(String amount) {
            this.amount = amount;
        }

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }

}
