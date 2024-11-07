package com.example.fridget.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Measurements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String measurement;
    private String Abbreviation;

    public Measurements(int id, String measurement, String abbreviation) {
        this.id = id;
        this.measurement = measurement;
        Abbreviation = abbreviation;
    }

    public String getMeasurement() {
        return measurement;
    }

    public void setMeasurement(String measurement) {
        this.measurement = measurement;
    }

    public String getAbbreviation() {
        return Abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        Abbreviation = abbreviation;
    }

    public int getId() {
        return id;
    }
}
