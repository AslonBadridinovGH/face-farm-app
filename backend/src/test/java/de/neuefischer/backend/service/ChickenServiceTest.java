package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.ChickenDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.repository.ChickensRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class ChickenServiceTest {

    ChickensRepo chickensRepo = Mockito.mock(ChickensRepo.class);
    IdService idService = Mockito.mock(IdService.class);


    @Test
    void getChickenTest_returnListOfAllChicken(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        // GIVEN
        Mockito.when(chickensRepo.findAll()).thenReturn(
                List.of(
                new Chicken("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Chicken("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
               )
        );

        ChickenService chickenService = new ChickenService(chickensRepo, idService);

        // WHEN
        List<Chicken> actual = chickenService.getChickens();

        // THEN
        assertEquals(List.of(
                new Chicken("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Chicken("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
        ), actual);

        Mockito.verify(chickensRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(chickensRepo);
    }

    @Test
    void getChickenByIdTest_returnOneChicken(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);

        // GIVEN
         String expectedId = "1";

         Mockito.when(chickensRepo.findById(expectedId)).thenReturn(Optional.of(

         new Chicken("1","ross308", 0.5, 2.8, 40,
                1.6, "kwh", localDate)
         ));
        ChickenService chickenService = new ChickenService(chickensRepo, idService);

        //WHEN
        Chicken actual = chickenService.getById(expectedId);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expectedId, actual.id());
    }

    @Test
    void addChickenTest_returnChicken(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        String dateString = "2024-02-12";

        ChickenDto chickenDto = new ChickenDto("ross308", 0.5, 2.8, 40,
                1.6, "kwh", dateString);


        Chicken chicken =  new Chicken("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
        Mockito.when(chickensRepo.save(chicken)).thenReturn(chicken);
        Mockito.when(idService.newId()).thenReturn("test-id");

        ChickenService chickenService = new ChickenService(chickensRepo, idService);

        // WHEN
        Chicken actual = chickenService.addChicken(chickenDto);

        // THEN
        Mockito.verify(chickensRepo).save(chicken);
        Mockito.verify(idService).newId();

        Chicken expected =  new Chicken("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        assertEquals(expected, actual);

    }

    @Test
    void updateChickenTest_returnChicken(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        Chicken updateChicken =  new Chicken("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        Mockito.when(chickensRepo.save(Mockito.any())).thenReturn(updateChicken);

        ChickenService chickenService = new ChickenService(chickensRepo, idService);

        // WHEN
        Chicken actual = chickenService.updateChicken(updateChicken);

        //THEN
         assertEquals(updateChicken, actual);
         Mockito.verify(chickensRepo, Mockito.times(1)).save(updateChicken);
         Mockito.verifyNoMoreInteractions(chickensRepo);



    }

    @Test
    void deleteChickenTest_returnChicken(){

        String id = "1";
        LocalDate date = LocalDate.of(2024, 2, 12);

        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
         Mockito.when(chickensRepo.findById(id)).thenReturn(Optional.of(chicken));

         ChickenService chickenService = new ChickenService(chickensRepo, idService);
         Chicken actual = chickenService.deleteChickenById(id);

        // WHEN

        assertEquals(chicken, actual);

        Mockito.verify(chickensRepo, Mockito.times(1)).findById(id);
        Mockito.verify(chickensRepo, Mockito.times(1)).delete(chicken);
        Mockito.verifyNoMoreInteractions(chickensRepo);

    }


}
