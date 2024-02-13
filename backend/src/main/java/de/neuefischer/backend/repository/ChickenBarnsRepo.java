package de.neuefischer.backend.repository;

import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.ChickenBarn;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChickenBarnsRepo extends MongoRepository<ChickenBarn, String> {
}
