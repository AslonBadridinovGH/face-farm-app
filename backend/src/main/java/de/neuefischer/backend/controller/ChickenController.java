package de.neuefischer.backend.controller;

import de.neuefischer.backend.dto.ChickenDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.service.ChickenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chickens")
@RequiredArgsConstructor
public class ChickenController {

    private final ChickenService chickenService;


    @GetMapping
    public List<Chicken> getChickens(){
        return chickenService.getChickens();
    }

    @GetMapping("/{id}")
    public Chicken getChickenById(@PathVariable String id) {
        return chickenService.getById(id);
    }

    @PostMapping
    public Chicken addChicken(@RequestBody ChickenDto chickenDto){
        return chickenService.addChicken(chickenDto);
    }

    @PutMapping("/{id}")
    public Chicken updateChicken(@RequestBody Chicken chicken){
        return chickenService.updateChicken(chicken);
    }

    @DeleteMapping("/{id}")
    public Chicken deleteChicken(@PathVariable String id){
           return chickenService.deleteChickenById(id);
    }

}
