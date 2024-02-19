package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Farm;
import de.neuefischer.backend.modul.Silo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FarmsRepo extends MongoRepository<Farm, String> {}
