package de.neuefischer.backend.dto;

import java.util.List;

public record FatteningPeriodDto(

        String id,
        List <String> chickenIDs,
        Integer lostToDay,
        String  startDate,
        String  dateOfSlaughter

) {}

