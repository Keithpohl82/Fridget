package com.example.fridget.models.data;

import com.example.fridget.models.RecipeDirections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface RecipeDirectionsRepo extends JpaRepository<RecipeDirections, Long> {

}
