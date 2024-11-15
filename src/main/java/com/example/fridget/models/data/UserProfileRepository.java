package com.example.fridget.models.data;

import com.example.fridget.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserUsername(String username); // Query by username through the User relationship
}

