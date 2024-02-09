package de.neuefischer.backend.dto;

import java.time.LocalDate;

public record ChickenDto(
        String race, Integer weightInFirstDay, Integer expectedSlaughterWeight,
        Integer expectedSlaughterAge,Double feedConversion, String hatchery,
        String hatchDay
) {
}
