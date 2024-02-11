package de.neuefischer.backend.dto;

public record FeedDto(

        String articleNumber,
        String type,
        String description,
        Double pricePerTone){
}
