package de.neuefischer.backend.controller;

import de.neuefischer.backend.dto.ChickenBarnDto;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.service.ChickenBarnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chickenBarns")
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
    public ResponseEntity<?> addChickenBarn(@RequestBody ChickenBarnDto chickenBarnDto){
        return chickenBarnService.addChickenBarn(chickenBarnDto);
    }


    @PutMapping("/{id}")
    public ChickenBarn updateChickenBarn(@PathVariable String id, @RequestBody ChickenBarnDto chickenBarnDto){
        return chickenBarnService.updateChickenBarn(id, chickenBarnDto);
    }

    @DeleteMapping("/{id}")
    public ChickenBarn deleteChickenBarn(@PathVariable String id){
           return chickenBarnService.deleteChickenBarnById(id);
    }

}
