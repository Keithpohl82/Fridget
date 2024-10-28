package com.example.fridget.models.data;


import com.example.fridget.models.UserInventory;
import org.springframework.data.repository.CrudRepository;

public interface UserInventoryRepository extends CrudRepository<UserInventory, Integer> {
}
