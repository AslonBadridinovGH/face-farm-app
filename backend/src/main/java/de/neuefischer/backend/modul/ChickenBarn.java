package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record ChickenBarn(

   @Id
   String  id,
   Double  area,
   String name,
   List <Chicken> chickens,
   Integer amountOfChickens,
   Integer capacityForChickens,
   List<Silo> silos
   )
{}
