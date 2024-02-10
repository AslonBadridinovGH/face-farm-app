package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.ChickenBarnDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.ChickenBarnsRepo;
import de.neuefischer.backend.repository.ChickensRepo;
import de.neuefischer.backend.repository.SilosRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChickenBarnServiceTest {

    ChickenBarnsRepo chickenBarnsRepo = Mockito.mock(ChickenBarnsRepo.class);
    IdService idService = Mockito.mock(IdService.class);
    ChickensRepo chickensRepo=Mockito.mock(ChickensRepo.class);
    SilosRepo silosRepo=Mockito.mock(SilosRepo.class);



    @Test
    void getChickenBarnTest_returnListOfAllChickenBarn(){

        // GIVEN
        Mockito.when(chickenBarnsRepo.findAll()).thenReturn(
                List.of(
                new ChickenBarn("1", 1.2, "stall_1", new ArrayList<Chicken>(), 0,
                        35000, new ArrayList<Silo>()),
                new ChickenBarn("2", 1.3, "stall_2", new ArrayList<Chicken>(), 0,
                        35000, new ArrayList<Silo>())
               )
        );
        ChickenBarnService chickenBarnService = new ChickenBarnService(chickenBarnsRepo, idService,chickensRepo,silosRepo);

        // WHEN
        List<ChickenBarn> actual = chickenBarnService.getChickenBarns();

        // THEN
        assertEquals(
                List.of(
                        new ChickenBarn("1", 1.2, "stall_1", new ArrayList<Chicken>(), 0,
                                35000, new ArrayList<Silo>()),
                        new ChickenBarn("2", 1.3, "stall_2", new ArrayList<Chicken>(), 0,
                                35000, new ArrayList<Silo>())
                ), actual);

        Mockito.verify(chickenBarnsRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(chickenBarnsRepo);
    }

    @Test
    void getChickenBarnByIdTest_returnOneChickenBarn(){


        // GIVEN
         String expectedId = "1";

         Mockito.when(chickenBarnsRepo.findById(expectedId)).thenReturn(Optional.of(

                 new ChickenBarn("1", 1.2, "stall_1", new ArrayList<Chicken>(), 0,
                         35000, new ArrayList<Silo>())
         ));
        ChickenBarnService chickenBarnService = new ChickenBarnService(chickenBarnsRepo, idService, chickensRepo, silosRepo);

        //WHEN
        ChickenBarn actual = chickenBarnService.getById(expectedId);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expectedId, actual.id());
    }

    @Test
    void addChickenBarnTest_returnChickenBarn(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);
        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40, 1.6, "kwh", localDate);

        Silo silo = new Silo("1", 1, 10, 10, new ArrayList<Feed>());

        ChickenBarnDto chickenBarnDto = new ChickenBarnDto(1.2, "stall_1",  new String[]{"1"}, 0, 35000, new String[]{"1"});

        ChickenBarn chickenBarn = new ChickenBarn("test-id", 1.2, "stall_1", new ArrayList<Chicken>(List.of(chicken)), 0,
                35000, new ArrayList<Silo>(List.of(silo)));



        // GIVEN
        String id = "1";
        Mockito.when(chickensRepo.findById(id)).thenReturn(Optional.of(chicken));
        Mockito.when(silosRepo.findById(id)).thenReturn(Optional.of(silo));
        Mockito.when(chickenBarnsRepo.save(chickenBarn)).thenReturn(chickenBarn);
        Mockito.when(idService.newId()).thenReturn("test-id");

        ChickenBarnService chickenBarnService = new ChickenBarnService(chickenBarnsRepo, idService, chickensRepo, silosRepo);

        // WHEN
        ChickenBarn actual = chickenBarnService.addChickenBarn(chickenBarnDto);

        // THEN
        Mockito.verify(chickenBarnsRepo, Mockito.times(1)).save(chickenBarn);
        Mockito.verify(chickensRepo, Mockito.times(1) ).findById(id);
        Mockito.verify(silosRepo,  Mockito.times(1)).findById(id);
        Mockito.verify(idService).newId();


        ChickenBarn expected = new ChickenBarn("test-id", 1.2, "stall_1", new ArrayList<Chicken>(List.of(chicken)), 0,
                35000, new ArrayList<Silo>(List.of(silo)));

        assertEquals(expected, actual);

    }

    @Test
    void updateChickenBarnTest_returnChickenBarn(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);
        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40, 1.6, "kwh", localDate);

        Silo silo = new Silo("1", 1, 10, 10, new ArrayList<Feed>());

        ChickenBarn chickenBarn = new ChickenBarn("test-id", 1.2, "stall_1", new ArrayList<Chicken>(List.of(chicken)), 0,
                35000, new ArrayList<Silo>(List.of(silo)));


        Mockito.when(chickenBarnsRepo.save(chickenBarn)).thenReturn(chickenBarn);
        ChickenBarnService chickenBarnService = new ChickenBarnService(chickenBarnsRepo, idService, chickensRepo, silosRepo);

        // WHEN
        ChickenBarn actual = chickenBarnService.updateChickenBarn(chickenBarn);

        //THEN
         assertEquals(chickenBarn, actual);
         Mockito.verify(chickenBarnsRepo, Mockito.times(1)).save(chickenBarn);
         Mockito.verifyNoMoreInteractions(chickenBarnsRepo);
    }

    @Test
    void deleteChickenBarnTest_returnChickenBarn(){

        String id = "1";

        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40, 1.6, "kwh", LocalDate.of(2024, 2, 12));

        Silo silo = new Silo("1", 1, 10, 10, new ArrayList<Feed>());

        ChickenBarn chickenBarn = new ChickenBarn("test-id", 1.2, "stall_1", new ArrayList<Chicken>(List.of(chicken)), 0,
                35000, new ArrayList<Silo>(List.of(silo)));

        // GIVEN
         Mockito.when(chickenBarnsRepo.findById(id)).thenReturn(Optional.of(chickenBarn));

         ChickenBarnService chickenBarnService = new ChickenBarnService(chickenBarnsRepo, idService, chickensRepo, silosRepo);
         ChickenBarn actual = chickenBarnService.deleteChickenBarnById(id);

        // WHEN
        assertEquals(chickenBarn, actual);

        Mockito.verify(chickenBarnsRepo, Mockito.times(1)).findById(id);
        Mockito.verify(chickenBarnsRepo, Mockito.times(1)).delete(chickenBarn);
        Mockito.verifyNoMoreInteractions(chickenBarnsRepo);

    }


}
