package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.SiloDto;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.SilosRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SiloServiceTest {

    SilosRepo chickensRepo = Mockito.mock(SilosRepo.class);
    IdService idService = Mockito.mock(IdService.class);


    @Test
    void getSiloTest_returnListOfAllSilo(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        // GIVEN
        Mockito.when(chickensRepo.findAll()).thenReturn(
                List.of(
                new Silo("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Silo("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
               )
        );

        SiloService chickenService = new SiloService(chickensRepo, idService);

        // WHEN
        List<Silo> actual = chickenService.getSilos();

        // THEN
        assertEquals(List.of(
                new Silo("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Silo("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
        ), actual);

        Mockito.verify(chickensRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(chickensRepo);
    }

    @Test
    void getSiloByIdTest_returnOneSilo(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);

        // GIVEN
         String expectedId = "1";

         Mockito.when(chickensRepo.findById(expectedId)).thenReturn(Optional.of(

         new Silo("1","ross308", 0.5, 2.8, 40,
                1.6, "kwh", localDate)
         ));
        SiloService chickenService = new SiloService(chickensRepo, idService);

        //WHEN
        Silo actual = chickenService.getById(expectedId);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expectedId, actual.id());
    }

    @Test
    void addSiloTest_returnSilo(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        String dateString = "2024-02-12";

        SiloDto chickenDto = new SiloDto("ross308", 0.5, 2.8, 40,
                1.6, "kwh", dateString);


        Silo chicken =  new Silo("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
        Mockito.when(chickensRepo.save(chicken)).thenReturn(chicken);
        Mockito.when(idService.newId()).thenReturn("test-id");

        SiloService chickenService = new SiloService(chickensRepo, idService);

        // WHEN
        Silo actual = chickenService.addSilo(chickenDto);

        // THEN
        Mockito.verify(chickensRepo).save(chicken);
        Mockito.verify(idService).newId();

        Silo expected =  new Silo("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        assertEquals(expected, actual);

    }

    @Test
    void updateSiloTest_returnSilo(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        Silo updateSilo =  new Silo("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        Mockito.when(chickensRepo.save(Mockito.any())).thenReturn(updateSilo);

        SiloService chickenService = new SiloService(chickensRepo, idService);

        // WHEN
        Silo actual = chickenService.updateSilo(updateSilo);

        //THEN
         assertEquals(updateSilo, actual);
         Mockito.verify(chickensRepo, Mockito.times(1)).save(updateSilo);
         Mockito.verifyNoMoreInteractions(chickensRepo);



    }

    @Test
    void deleteSiloTest_returnSilo(){

        String id = "1";
        LocalDate date = LocalDate.of(2024, 2, 12);

        Silo chicken = new Silo("1", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
         Mockito.when(chickensRepo.findById(id)).thenReturn(Optional.of(chicken));

         SiloService chickenService = new SiloService(chickensRepo, idService);
         Silo actual = chickenService.deleteSiloById(id);

        // WHEN

        assertEquals(chicken, actual);

        Mockito.verify(chickensRepo, Mockito.times(1)).findById(id);
        Mockito.verify(chickensRepo, Mockito.times(1)).delete(chicken);
        Mockito.verifyNoMoreInteractions(chickensRepo);

    }


}
