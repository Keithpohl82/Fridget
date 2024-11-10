package com.example.fridget.models.data;

import com.example.fridget.models.Ingredients;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {
    boolean existsByName(String name);
}
