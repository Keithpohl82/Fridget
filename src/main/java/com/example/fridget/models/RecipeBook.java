package com.example.fridget.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class RecipeBook {

    @Id
    @GeneratedValue
    private int id;

}
