package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SilosRepo extends MongoRepository<Silo, String> {
}
