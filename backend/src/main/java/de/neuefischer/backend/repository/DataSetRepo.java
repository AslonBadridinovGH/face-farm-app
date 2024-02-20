package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.modul.Dataset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DataSetRepo extends MongoRepository<Dataset, String> {
}
