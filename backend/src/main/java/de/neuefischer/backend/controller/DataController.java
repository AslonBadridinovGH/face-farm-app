package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping
    public List<Data> getAllData(){
        return dataService.getData();
    }

    @PostMapping
    public Data addData(@RequestBody Data data){
        return dataService.addData(data);
    }


}
