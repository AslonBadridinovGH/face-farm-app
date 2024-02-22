package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.ConsumeDataset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsumeDataSetRepo extends MongoRepository<ConsumeDataset, String> {
}
