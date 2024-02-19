package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.UserDataType;
import de.neuefischer.backend.repository.UserDataRepo;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class UserDataService {

    private final UserDataRepo userDataRepo;
    private final IdService idService;

    public UserDataService(UserDataRepo userDataRepo, IdService idService) {
        this.userDataRepo = userDataRepo;
        this.idService = idService;
    }

    public List<UserDataType> getUserData() {
        return userDataRepo.findAll();
    }

    public UserDataType addUserData(UserDataType userData) {

        String id = idService.newId();

        return userDataRepo.save(userData);
    }

}
