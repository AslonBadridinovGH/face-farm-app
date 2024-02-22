package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.ConsumeData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsumeDataRepo extends MongoRepository<ConsumeData, String> {
}
