package de.neuefischer.backend.dto;

import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.Silo;
import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record ChickenBarnDto(

   Double  area,
   String  name,
   String [] chickensIds,
   Integer amountOfChickens,
   Integer capacityForChickens,
   String [] silosIds
)
{}
