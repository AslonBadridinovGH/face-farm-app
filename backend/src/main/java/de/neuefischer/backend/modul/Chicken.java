package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@With
public record Chicken(
        @Id
        String id, String race, Double weightInFirstDay, Double expectedSlaughterWeight,
        Integer expectedSlaughterAge, Double feedConversion, String hatchery,
        LocalDate hatchDay

        ) {
}
