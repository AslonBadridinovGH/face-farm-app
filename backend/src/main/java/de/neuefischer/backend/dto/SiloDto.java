package de.neuefischer.backend.dto;


public record SiloDto(

        Integer  numberOfSilo,
        Integer capacity,
        Double amountOfFeed,
        String [] feedIds) {
}
