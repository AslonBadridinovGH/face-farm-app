package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Consume;
import de.neuefischer.backend.service.ConsumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consume")
@RequiredArgsConstructor
public class ConsumeController {

    private final ConsumeService consumeService;

    @GetMapping
    public Consume getAllConsume(){
        return consumeService.getConsume();
    }

    @PostMapping
    public Consume addConsume(){
        return consumeService.addConsume();
    }

}
