package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Objects;

@With
public record Silo(

        @Id
        String id,
        Integer numberOfSilo,
        Integer capacity,
        Double amountOfFeed,
        List<Feed> feeds ) {

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Silo silo = (Silo) o;
                return Objects.equals(id, silo.id) && Objects.equals(numberOfSilo, silo.numberOfSilo) && Objects.equals(capacity, silo.capacity) && Objects.equals(amountOfFeed, silo.amountOfFeed) && Objects.equals(feeds, silo.feeds);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, numberOfSilo, capacity, amountOfFeed, feeds);
        }

        @Override
        public String toString() {
                return "Silo{" +
                        "id='" + id + '\'' +
                        ", numberOfSilo=" + numberOfSilo +
                        ", capacity=" + capacity +
                        ", amountOfFeed=" + amountOfFeed +
                        ", feeds=" + feeds +
                        '}';
        }
}
