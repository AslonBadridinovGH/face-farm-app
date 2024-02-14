package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.Objects;

@With
public record Chicken(
        @Id
        String id,
        String race,
        Double weightInFirstDay,
        Double expectedSlaughterWeight,
        Integer expectedSlaughterAge,
        Double feedConversion,
        String hatchery,
        LocalDate hatchDay
        ) {
        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Chicken chicken = (Chicken) o;
                return Objects.equals(id, chicken.id) && Objects.equals(race, chicken.race) && Objects.equals(weightInFirstDay, chicken.weightInFirstDay) && Objects.equals(expectedSlaughterWeight, chicken.expectedSlaughterWeight) && Objects.equals(expectedSlaughterAge, chicken.expectedSlaughterAge) && Objects.equals(feedConversion, chicken.feedConversion) && Objects.equals(hatchery, chicken.hatchery) && Objects.equals(hatchDay, chicken.hatchDay);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, race, weightInFirstDay, expectedSlaughterWeight, expectedSlaughterAge, feedConversion, hatchery, hatchDay);
        }

        @Override
        public String toString() {
                return "Chicken{" +
                        "id='" + id + '\'' +
                        ", race='" + race + '\'' +
                        ", weightInFirstDay=" + weightInFirstDay +
                        ", expectedSlaughterWeight=" + expectedSlaughterWeight +
                        ", expectedSlaughterAge=" + expectedSlaughterAge +
                        ", feedConversion=" + feedConversion +
                        ", hatchery='" + hatchery + '\'' +
                        ", hatchDay=" + hatchDay +
                        '}';
        }
}
