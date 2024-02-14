package de.neuefischer.backend.dto;
import de.neuefischer.backend.modul.Feed;


public record SiloDto(

        Integer  numberOfSilo,
        Integer capacity,
        Double amountOfFeed,
        String [] feedIds) {
}
