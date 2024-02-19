package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.modul.Dataset;
import de.neuefischer.backend.service.DataService;
import de.neuefischer.backend.service.DataSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dataSet")
@RequiredArgsConstructor
public class DataSetController {

    private final DataSetService dataService;

    @GetMapping
    public List<Dataset> getAllDataSets(){
        return dataService.getDataSet();
    }

    @PostMapping
    public Dataset addDataSet(@RequestBody Dataset data){
        return dataService.addDataSet(data);
    }

}
