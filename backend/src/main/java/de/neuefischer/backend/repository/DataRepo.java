package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Data;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DataRepo extends MongoRepository<Data, String> {
}
