package com.example.fridget.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Measurements {

    @Id
    @GeneratedValue
    private int id;

    private String measurement;
    private String Abbreviation;

}
