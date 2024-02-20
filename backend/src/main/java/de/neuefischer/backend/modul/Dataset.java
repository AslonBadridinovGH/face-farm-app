package de.neuefischer.backend.modul;

import lombok.With;

import java.util.List;

@With
public record Dataset(

        String id,
        String  label,
        List<Integer> data,   // year , userGain , userLost
        List <String> backgroundColor,
        String  borderColor,
        Integer borderWidth

) {
}
