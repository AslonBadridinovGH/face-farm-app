package de.neuefischer.backend.repository;
import de.neuefischer.backend.modul.FatteningPeriod;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FatteningPeriodsRepo extends MongoRepository<FatteningPeriod, String> {
}
