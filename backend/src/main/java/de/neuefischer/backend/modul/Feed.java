package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record Feed(
        @Id
        String id,
        String articleNumber,
        String type,
        String description,
        Double pricePerTone){
}
