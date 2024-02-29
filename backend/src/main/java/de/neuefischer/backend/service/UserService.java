package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.User;
import de.neuefischer.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;


    public String getUserById(String id) {
        Optional<User> byId = userRepo.findById(id);
        if (byId.isPresent()) {
            return byId.get().name();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with such id!"));
    }

}
