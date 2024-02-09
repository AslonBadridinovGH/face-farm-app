package de.neuefischer.backend.controller;
import de.neuefischer.backend.dto.SiloDto;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.service.SiloService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/silo")
@RequiredArgsConstructor
public class SiloController {

    private final SiloService siloService;


    @GetMapping
    public List<Silo> getSilos(){
        return siloService.getSilos();
    }

    @GetMapping("/{id}")
    public Silo getSiloById(@PathVariable String id) {
        return siloService.getById(id);
    }

    @PostMapping
    public Silo addSilo(@RequestBody SiloDto siloDto){
        return siloService.addSilo(siloDto);
    }

    @PutMapping("/{id}")
    public Silo updateSilo(@RequestBody Silo silo){
        return siloService.updateSilo(silo);
    }


    @DeleteMapping("/{id}")
    public Silo deleteSilo(@PathVariable String id){
           return siloService.deleteSiloById(id);
    }

}
