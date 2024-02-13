package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Objects;

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
{
   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      ChickenBarn that = (ChickenBarn) o;
      return Objects.equals(id, that.id) && Objects.equals(area, that.area) && Objects.equals(name, that.name) && Objects.equals(chickens, that.chickens) && Objects.equals(amountOfChickens, that.amountOfChickens) && Objects.equals(capacityForChickens, that.capacityForChickens) && Objects.equals(silos, that.silos);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id, area, name, chickens, amountOfChickens, capacityForChickens, silos);
   }

   @Override
   public String toString() {
      return "ChickenBarn{" +
              "id='" + id + '\'' +
              ", area=" + area +
              ", name='" + name + '\'' +
              ", chickens=" + chickens +
              ", amountOfChickens=" + amountOfChickens +
              ", capacityForChickens=" + capacityForChickens +
              ", silos=" + silos +
              '}';
   }
}
