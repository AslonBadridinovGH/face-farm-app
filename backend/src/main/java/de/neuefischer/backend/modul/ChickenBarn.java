package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record ChickenBarn(
   @Id
   String id,
   Double area,
   Chicken chicken,
   Integer amountOfChickens,
   Integer nameOfSilo,
   Integer capacityForChickens,
   Silo[]silos ) { }
