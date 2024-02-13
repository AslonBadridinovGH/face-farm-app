package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.Feed;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedsRepo extends MongoRepository<Feed, String> {
}
