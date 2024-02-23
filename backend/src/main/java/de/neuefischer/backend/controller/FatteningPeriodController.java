package de.neuefischer.backend.controller;
import de.neuefischer.backend.dto.FatteningPeriodDto;
import de.neuefischer.backend.modul.FatteningPeriod;
import de.neuefischer.backend.service.FatteningPeriodService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fattening")
@RequiredArgsConstructor
public class FatteningPeriodController {

    private final FatteningPeriodService fatteningService;

    @GetMapping
    public List<FatteningPeriod> getFatteningPeriods(){
        return fatteningService.getFatteningPeriods();
    }

    @GetMapping("/{id}")
    public FatteningPeriod getFatteningPeriodById(@PathVariable String id) {
        return fatteningService.getById(id);
    }

    @PostMapping
    public FatteningPeriod addFatteningPeriod(@RequestBody FatteningPeriodDto fatteningDto){
        return fatteningService.addFatteningPeriod(fatteningDto);
    }

    @PutMapping("/{id}")
    public FatteningPeriod updateFatteningPeriod(@PathVariable String id, @RequestBody FatteningPeriodDto fatteningDto){
        return fatteningService.updateFatteningPeriod(id, fatteningDto);
    }

    @DeleteMapping("/{id}")
    public FatteningPeriod deleteFatteningPeriod(@PathVariable String id){
           return fatteningService.deleteFatteningPeriodById(id);
    }

}
