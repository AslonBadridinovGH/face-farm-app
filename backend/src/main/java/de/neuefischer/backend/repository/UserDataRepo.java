package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.UserDataType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDataRepo extends MongoRepository<UserDataType, String> {
}
