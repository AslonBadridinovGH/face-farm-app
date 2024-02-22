package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.service.ConsumeDataSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consumeDataSet")
@RequiredArgsConstructor
public class ConsumeDataSetController {

    private final ConsumeDataSetService dataSetService;

    @GetMapping
    public List<ConsumeDataset> getAllFeedDataSets(){
        return dataSetService.getConsumeDataSet();
    }

    @PostMapping
    public ConsumeDataset addFeedDataSet(@RequestBody ConsumeDataset dataset){
        return dataSetService.addConsumeDataSet(dataset);
    }

}
