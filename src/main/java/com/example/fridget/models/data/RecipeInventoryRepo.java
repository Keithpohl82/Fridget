package com.example.fridget.models.data;


import com.example.fridget.models.RecipeInventory;
import org.springframework.data.repository.CrudRepository;

public interface RecipeInventoryRepo extends CrudRepository<RecipeInventory, Integer> {

}
