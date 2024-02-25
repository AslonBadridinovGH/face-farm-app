package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FatteningPeriodDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.FatteningPeriod;
import de.neuefischer.backend.repository.ChickensRepo;
import de.neuefischer.backend.repository.FatteningPeriodsRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.*;


@Service
public class FatteningPeriodService {

    private final FatteningPeriodsRepo fatteningsRepo;
    private final IdService idService;
    private final ChickensRepo chickensRepo;

    public FatteningPeriodService(IdService idService, FatteningPeriodsRepo fatteningsRepo, ChickensRepo chickensRepo) {
        this.idService = idService;
        this.fatteningsRepo = fatteningsRepo;
        this.chickensRepo = chickensRepo;
    }


    public List<FatteningPeriod> getFatteningPeriods() {
        return fatteningsRepo.findAll();
    }

    public FatteningPeriod getById(String id) {
        Optional<FatteningPeriod> byId = fatteningsRepo.findById(id);
        if (byId.isPresent()){
            return byId.get();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No Fattening Period with such id!: " +id));
    }

    public FatteningPeriod addFatteningPeriod(FatteningPeriodDto fatteningDto) {

        List <Chicken> chickens = new ArrayList<>();
        List <String> chickenIDs = fatteningDto.chickenIDs();

        for (String chickenID : chickenIDs) {
            Optional<Chicken> optionalChicken = chickensRepo.findById(chickenID);
            if (optionalChicken.isEmpty()){
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No chicken with such id: "+chickenID));
            } else{
                chickens.add(optionalChicken.get());
            }
        }

         String id = idService.newId();
         String dateString = fatteningDto.startDate();

        LocalDate startDate = null;
        if (!dateString.isEmpty()){
            try {
                // Define the date format
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                // Parse the string to a LocalDate object
                startDate = LocalDate.parse(dateString, formatter);

            } catch (DateTimeParseException e) {
                // Handle parsing exception
                System.out.println("Error parsing the date: " + e.getMessage());
            }
        }

        LocalDate dateOfSlaughter = null;
        String slaughterDay = fatteningDto.dateOfSlaughter();

        if (!dateString.isEmpty()){
            try {
                // Define the date format
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                // Parse the string to a LocalDate object
                dateOfSlaughter = LocalDate.parse(slaughterDay, formatter);

            } catch (DateTimeParseException e) {
                // Handle parsing exception
                System.out.println("Error parsing the date: " + e.getMessage());
            }
        }

        long old = 0;
        if (startDate != null){
            old = Period.between( Objects.requireNonNull(startDate), LocalDate.now()).get(ChronoUnit.DAYS);
        }

        String currentFeedingPhase;

        if (old<=18){
            currentFeedingPhase = "starter";
        }
        else if (old<=25) {
            currentFeedingPhase = "Aufzucht";
        }
        else {
            currentFeedingPhase = "finisher";
        }

        int totalLost = 0;
             totalLost += fatteningDto.lostToDay();

            FatteningPeriod fattening = new FatteningPeriod(
          id, chickens, startDate, LocalDate.now(), old, currentFeedingPhase, fatteningDto.lostToDay(), totalLost, dateOfSlaughter);

        return fatteningsRepo.save(fattening);

    }


    public FatteningPeriod updateFatteningPeriod(String id, FatteningPeriodDto fatteningDto){

        Optional<FatteningPeriod> optionalPeriod = fatteningsRepo.findById(id);
        if (optionalPeriod.isEmpty()){
            throw (new NoSuchElementException());
        }

        List <Chicken> chickens = new ArrayList<>();

        List <String> chickenIDs = fatteningDto.chickenIDs();
        for (String chickenID : chickenIDs) {
            Optional<Chicken> optionalChicken = chickensRepo.findById(chickenID);
            if (optionalChicken.isEmpty()){
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No chicken with such id: "+chickenID));
            } else{
                chickens.add(optionalChicken.get());
            }
        }

        String startDateString = fatteningDto.startDate();
        LocalDate startDate = null;
        if (!startDateString.isEmpty()){
            try {
                // Define the date format
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                // Parse the string to a LocalDate object
                startDate = LocalDate.parse(startDateString, formatter);

            } catch (DateTimeParseException e) {
                // Handle parsing exception
                System.out.println("Error parsing the date: " + e.getMessage());
            }
        }

        LocalDate dateOfSlaughter = null;
        String slaughterString = fatteningDto.dateOfSlaughter();
        if (!fatteningDto.dateOfSlaughter().isEmpty()){
            try {
                // Define the date format
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                // Parse the string to a LocalDate object
                dateOfSlaughter = LocalDate.parse(slaughterString, formatter);

            } catch (DateTimeParseException e) {
                // Handle parsing exception
                System.out.println("Error parsing the date: " + e.getMessage());
            }
        }

        long old = 0;
        if (startDate != null){
           old = Period.between(Objects.requireNonNull(startDate), LocalDate.now()).get(ChronoUnit.DAYS);
        }

        String currentFeedingPhase;

        if (old<=18){
            currentFeedingPhase = "starter";
        } else if (old<=25) {
            currentFeedingPhase = "Aufzucht";
        }else {
            currentFeedingPhase = "finisher";
        }

         FatteningPeriod fatteningPeriod = optionalPeriod.get();

         int totalLost = fatteningPeriod.totalLost();
         totalLost  += fatteningDto.lostToDay();

                 FatteningPeriod updatedfatteningPeriod = fatteningPeriod
                .withId(id).withChickens(chickens).withStartDate(startDate).withCurrentOld(old)
                .withCurrentFeedingPhase(currentFeedingPhase).withLostToDay(fatteningDto.lostToDay())
                .withTotalLost(totalLost).withDateOfSlaughter(dateOfSlaughter);

         fatteningsRepo.save(updatedfatteningPeriod);
         return updatedfatteningPeriod;

    }


    public FatteningPeriod deleteFatteningPeriodById(String id) {
        Optional<FatteningPeriod> byId = fatteningsRepo.findById(id);
        if (byId.isPresent()){
            fatteningsRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
