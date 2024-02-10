package de.neuefischer.backend.repository;

import de.neuefischer.backend.modul.Chicken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChickensRepo extends MongoRepository<Chicken, String> {
}
