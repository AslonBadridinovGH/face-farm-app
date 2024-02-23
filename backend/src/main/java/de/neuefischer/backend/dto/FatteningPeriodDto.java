package de.neuefischer.backend.dto;

import java.util.List;

public record FatteningPeriodDto(

        String id,
        List <String> chickenIDs,
        Integer lostToday,
        String  startDate,
        String  dateOfSlaughter


) {}

