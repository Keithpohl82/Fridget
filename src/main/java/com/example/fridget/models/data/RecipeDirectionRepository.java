package com.example.fridget.models.data;

import com.example.fridget.models.RecipeDirections;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeDirectionRepository extends JpaRepository<RecipeDirections, Long> {
}
