package de.neuefischer.backend.controller;
import de.neuefischer.backend.dto.FarmDto;
import de.neuefischer.backend.modul.Farm;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/farm")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;


    @GetMapping
    public List<Farm> getFarms(){
        return farmService.getFarm();
    }

    @GetMapping("/{id}")
    public Farm getSiloById(@PathVariable String id) {
        return farmService.getById(id);
    }


    @PostMapping
    public Farm addFarm(@RequestBody FarmDto farmDto){
        return farmService.addFarmInfos(farmDto);
    }

    @PutMapping("/{id}")
    public Farm updateFarm(@PathVariable String id, @RequestBody FarmDto farmDto){
        return farmService.updateFarmInfo(id, farmDto);
    }

    @DeleteMapping("/{id}")
    public Farm deleteFarm(@PathVariable String id){
           return farmService.deleteFarmById(id);
    }


}
