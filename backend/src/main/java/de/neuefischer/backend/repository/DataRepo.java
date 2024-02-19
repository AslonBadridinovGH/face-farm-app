package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Data;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DataRepo extends MongoRepository<Data, String> {
}
