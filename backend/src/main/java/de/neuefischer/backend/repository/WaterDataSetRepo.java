package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.WaterDataset;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WaterDataSetRepo extends MongoRepository<WaterDataset, String> {
}
