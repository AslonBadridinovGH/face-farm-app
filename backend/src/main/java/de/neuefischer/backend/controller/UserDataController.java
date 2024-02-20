package de.neuefischer.backend.controller;
import de.neuefischer.backend.dto.SiloDto;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.modul.UserDataType;
import de.neuefischer.backend.service.SiloService;
import de.neuefischer.backend.service.UserDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userData")
@RequiredArgsConstructor
public class UserDataController {

    private final UserDataService userDataService;

    @GetMapping
    public UserDataType getAllUserData(){
        return userDataService.getUserData();
    }

    @PutMapping
    public UserDataType addUserData(){
        return userDataService.addUserData();
    }

}
