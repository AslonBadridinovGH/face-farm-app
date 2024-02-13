package de.neuefischer.backend.controller;

import de.neuefischer.backend.dto.ChickenBarnDto;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.service.ChickenBarnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chickenBarn")
@RequiredArgsConstructor
public class ChickenBarnController {

    private final ChickenBarnService chickenBarnService;


    @GetMapping
    public List<ChickenBarn> getChickenBarns(){
        return chickenBarnService.getChickenBarns();
    }

    @GetMapping("/{id}")
    public ChickenBarn getChickenBarnById(@PathVariable String id) {
        return chickenBarnService.getById(id);
    }

    @PostMapping
    public ChickenBarn addChickenBarn(@RequestBody ChickenBarnDto chickenBarnDto){
        return chickenBarnService.addChickenBarn(chickenBarnDto);
    }

    @PutMapping("/{id}")
    public ChickenBarn updateChickenBarn(@RequestBody ChickenBarn chickenBarn){
        return chickenBarnService.updateChickenBarn(chickenBarn);
    }


    @DeleteMapping("/{id}")
    public ChickenBarn deleteChickenBarn(@PathVariable String id){
           return chickenBarnService.deleteChickenBarnById(id);
    }

}