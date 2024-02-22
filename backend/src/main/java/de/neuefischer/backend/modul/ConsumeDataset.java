package de.neuefischer.backend.modul;

import lombok.With;

import java.util.List;

@With
public record ConsumeDataset(

        String  id,
        String  label,
        List <Integer> data,
        List <String> backgroundColor,
        String  borderColor,
        Integer borderWidth

) {
}
