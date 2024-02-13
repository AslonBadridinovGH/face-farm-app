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
        Integer amountAnimals,

        List <ChickenBarn> chickenBarns,
        List <Silo> silos,
        List <Integer> techniques,
        List <Integer> employees)  {

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
                        ", chickenBarns=" + chickenBarns +
                        ", silos=" + silos +
                        ", techniques=" + techniques +
                        ", employees=" + employees +
                        '}';
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Farm farm = (Farm) o;
                return Objects.equals(id, farm.id) && Objects.equals(name, farm.name) && Objects.equals(activity, farm.activity) && Objects.equals(address, farm.address) && Objects.equals(area, farm.area) && Objects.equals(constructionYear, farm.constructionYear) && Objects.equals(amountAnimals, farm.amountAnimals) && Objects.equals(chickenBarns, farm.chickenBarns) && Objects.equals(silos, farm.silos) && Objects.equals(techniques, farm.techniques) && Objects.equals(employees, farm.employees);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, name, activity, address, area, constructionYear, amountAnimals, chickenBarns, silos, techniques, employees);
        }
}
