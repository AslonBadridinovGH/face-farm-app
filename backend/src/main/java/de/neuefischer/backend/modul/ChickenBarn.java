package de.neuefischer.backend.modul;

public record ChickenBarn(
    Double area, Chicken chicken, Integer amountOfChickens,
    Integer nameOfSilo, Integer capacityForChickens, Silo[]silos ) {
}
