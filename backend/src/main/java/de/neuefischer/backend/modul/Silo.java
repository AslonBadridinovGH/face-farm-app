package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record Silo(

        @Id
        String id,
        Integer numberOfSilo,
        Integer capacity,
        Integer amountOfFeed,
        List<Feed> feeds ) {}
