package de.neuefischer.backend.dto;

public record ChickenDto(

        String race,
        Double weightInFirstDay,
        Double expectedSlaughterWeight,
        Integer expectedSlaughterAge,
        String feedConversion,
        String hatchery,
        String hatchDay

) {}
