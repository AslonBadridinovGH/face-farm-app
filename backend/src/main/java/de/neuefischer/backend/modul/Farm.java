package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Objects;

@With
public record Farm (

        @Id
        String id,
        String name,
        String activity,
        String address,
        Double area,
        Integer constructionYear,
        Integer amountAnimals
)  {

        @Override
        public String toString() {
                return "Farm{" +
                        "id='" + id + '\'' +
                        ", name='" + name + '\'' +
                        ", activity='" + activity + '\'' +
                        ", address='" + address + '\'' +
                        ", area=" + area +
                        ", constructionYear=" + constructionYear +
                        ", amountAnimals=" + amountAnimals +
                        '}';
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Farm farm = (Farm) o;
                return Objects.equals(id, farm.id) && Objects.equals(name, farm.name) && Objects.equals(activity, farm.activity) && Objects.equals(address, farm.address) && Objects.equals(area, farm.area) && Objects.equals(constructionYear, farm.constructionYear) && Objects.equals(amountAnimals, farm.amountAnimals);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, name, activity, address, area, constructionYear, amountAnimals);
        }
}
