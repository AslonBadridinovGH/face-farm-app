package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Consume;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsumeRepo extends MongoRepository<Consume, String> {
}
