package com.example.fridget.dtos;

import com.example.fridget.models.Ingredients;

import java.util.List;

public class GroceryListDTO {

    private Long userid;
    private List<Ingredients> items;

    // Getters and Setters
    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public List<Ingredients> getItems() {
        return items;
    }

    public void setItems(List<Ingredients> items) {
        this.items = items;
    }
}