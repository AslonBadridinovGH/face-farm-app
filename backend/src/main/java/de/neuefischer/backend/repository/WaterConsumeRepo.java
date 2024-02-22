package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.WaterConsume;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WaterConsumeRepo extends MongoRepository<WaterConsume, String> {
}
