package de.neuefischer.backend.modul;

import lombok.With;

import java.util.List;

@With
public record ConsumeDatasetDto(

        String  label,
        List <String> backgroundColor,
        String  borderColor,
        Integer borderWidth

) {
}
