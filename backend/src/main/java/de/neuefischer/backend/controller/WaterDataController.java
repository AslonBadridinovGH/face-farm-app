package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.WaterData;
import de.neuefischer.backend.service.WaterDataService;
import de.neuefischer.backend.service.WaterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waterData")
@RequiredArgsConstructor
public class WaterDataController {

    private final WaterDataService dataService;

    @GetMapping
    public List<WaterData> getAllData(){
       return dataService.getWaterData();
    }

    @PostMapping
    public WaterData addData(@RequestBody WaterData data){
       return dataService.addWaterData(data);
    }


}
