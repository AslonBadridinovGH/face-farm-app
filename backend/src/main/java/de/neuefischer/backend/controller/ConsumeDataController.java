package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.service.ConsumeDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consumeData")
@RequiredArgsConstructor
public class ConsumeDataController {

    private final ConsumeDataService dataService;

    @GetMapping
    public List<ConsumeData> getAllConsumeData(){
       return dataService.getConsumeData();
    }

    @PostMapping
    public ConsumeData addConsumeData(@RequestBody ConsumeData data){
       return dataService.addConsumeData(data);
    }



}
