package de.neuefischer.backend.modul;

import java.util.List;

public record Dataset(

        String  label,
        List<Integer> data,
        List<String> backgroundColors,
        String  borderColor,
        Integer borderWidth

) {
}
