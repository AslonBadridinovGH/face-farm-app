package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.WaterData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WaterDataRepo extends MongoRepository<WaterData, String> {
}
