package com.example.fridget.models.data;

import com.example.fridget.models.Ingredients;
import com.example.fridget.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {

}
