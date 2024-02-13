package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.Objects;

@With
public record Feed(
        @Id
        String id,
        String articleNumber,
        String type,
        String description,
        Double pricePerTone){

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Feed feed = (Feed) o;
                return Objects.equals(id, feed.id) && Objects.equals(articleNumber, feed.articleNumber) && Objects.equals(type, feed.type) && Objects.equals(description, feed.description) && Objects.equals(pricePerTone, feed.pricePerTone);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, articleNumber, type, description, pricePerTone);
        }

        @Override
        public String toString() {
                return "Feed{" +
                        "id='" + id + '\'' +
                        ", articleNumber='" + articleNumber + '\'' +
                        ", type='" + type + '\'' +
                        ", description='" + description + '\'' +
                        ", pricePerTone=" + pricePerTone +
                        '}';
        }
}
