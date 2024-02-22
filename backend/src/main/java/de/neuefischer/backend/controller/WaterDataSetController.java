package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.WaterDataset;
import de.neuefischer.backend.service.WaterDataSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waterDataSet")
@RequiredArgsConstructor
public class WaterDataSetController {

    private final WaterDataSetService dataSetService;

    @GetMapping
    public List<WaterDataset> getAllWaterDataSets(){
        return dataSetService.getWaterDataSet();
    }

    @PostMapping
    public WaterDataset addWaterDataSet(@RequestBody WaterDataset dataset){
        return dataSetService.addWaterDataSet(dataset);
    }

}
