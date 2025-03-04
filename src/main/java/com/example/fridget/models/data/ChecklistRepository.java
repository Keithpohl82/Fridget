package com.example.fridget.models.data;

import com.example.fridget.models.Checklist;
import com.example.fridget.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

}
