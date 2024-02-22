package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.WaterConsume;
import de.neuefischer.backend.service.WaterConsumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/waterConsume")
@RequiredArgsConstructor
public class WaterConsumeController {

    private final WaterConsumeService feedConsumeService;

    @GetMapping
    public WaterConsume getAllWaterConsume(){
        return feedConsumeService.getWaterConsume();
    }

    @PutMapping
    public WaterConsume addWaterConsume(){
        return feedConsumeService.addWaterConsume();
    }

}
