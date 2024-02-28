package de.neuefischer.backend.repository;


import de.neuefischer.backend.modul.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

}
