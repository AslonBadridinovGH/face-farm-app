package de.neuefischer.backend.modul;

public record Silo(
    Integer numberOfSilo, Integer capacity,
    Feed feed, Integer amountOfFeed ) {
}
