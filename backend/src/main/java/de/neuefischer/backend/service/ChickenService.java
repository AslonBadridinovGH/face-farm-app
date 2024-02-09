package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.ChickenDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.repository.ChickensRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ChickenService {

    private final ChickensRepo chickensRepo;
    private final IdService idService;

    public ChickenService(ChickensRepo chickensRepo, IdService idService) {
        this.chickensRepo = chickensRepo;
        this.idService = idService;
    }


    public List<Chicken> getChickens() {
        return chickensRepo.findAll();
    }

    public Chicken getById(String id) {
        Optional<Chicken> byId = chickensRepo.findById(id);
        if (byId.isPresent()){
            return byId.get();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No book with such id!"));
    }

    public Chicken addChicken(ChickenDto chickenDto) {

        String dateString = chickenDto.hatchDay();
        LocalDate date = null;
        try {
            // Define the date format
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // Parse the string to a LocalDate object
            date = LocalDate.parse(dateString, formatter);

        } catch (DateTimeParseException e) {
            // Handle parsing exception
            System.out.println("Error parsing the date: " + e.getMessage());
        }
        String id = idService.newId();
        Chicken chicken = new Chicken(
        id, chickenDto.race(),chickenDto.weightInFirstDay(),chickenDto.expectedSlaughterWeight(),
        chickenDto.expectedSlaughterAge(),chickenDto.feedConversion(),chickenDto.hatchery(), date
        );
        return chickensRepo.save(chicken);
    }

    public Chicken updateChicken(Chicken chicken){
         return chickensRepo.save(chicken);
    }

    public Chicken deleteChickenById(String id) {

        Optional<Chicken> byId = chickensRepo.findById(id);
        if (byId.isPresent()){
            chickensRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
