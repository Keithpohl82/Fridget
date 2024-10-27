package com.example.fridget.models.data;

import com.example.fridget.models.Measurements;
import org.springframework.data.repository.CrudRepository;

public interface MeasurementsRepository extends CrudRepository<Measurements, Integer> {
}
