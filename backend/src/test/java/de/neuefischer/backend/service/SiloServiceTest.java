package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.SiloDto;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.FeedsRepo;
import de.neuefischer.backend.repository.SilosRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SiloServiceTest {

    SilosRepo silosRepo = Mockito.mock(SilosRepo.class);
    IdService idService = Mockito.mock(IdService.class);
    FeedsRepo feedsRepo = Mockito.mock(FeedsRepo.class);


    @Test
    void getSiloTest_returnListOfAllSilo(){

        // GIVEN
        Mockito.when(silosRepo.findAll()).thenReturn(
                List.of(
                   new Silo("1", 1, 10, 2.5, new ArrayList<Feed>()),
                   new Silo("2", 2, 11, 3.5, new ArrayList<Feed>())
               )
        );

        SiloService siloService = new SiloService(silosRepo, idService, feedsRepo);

        // WHEN
        List<Silo> actual = siloService.getSilos();

        // THEN
        assertEquals(List.of(
                new Silo("1", 1, 10, 2.5, new ArrayList<Feed>()),
                new Silo("2", 2, 11, 3.5, new ArrayList<Feed>())
        ), actual);

        Mockito.verify(silosRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(silosRepo);
    }

    @Test
    void getSiloByIdTest_returnOneSilo(){

        // GIVEN
         String id = "1";

         Mockito.when(silosRepo.findById(id)).thenReturn(Optional.of(
             new Silo("1", 1, 10, 2.5, new ArrayList<Feed>())
         ));

        SiloService siloService = new SiloService(silosRepo, idService, feedsRepo);

        //WHEN
        Silo actual = siloService.getById(id);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(id, actual.id());
    }

    @Test
    void addSiloTest_returnSilo(){


        SiloDto siloDto = new SiloDto( 1, 10, 2.5, new String[]{"1"});
        Feed feed = new Feed("1", "2220", "starter", "desc", 0.5);
        Silo silo = new Silo("test-id", 1, 10, 2.5, new ArrayList<Feed>(List.of(feed)));

        // GIVEN
        Mockito.when(silosRepo.save(silo)).thenReturn(silo);
        Mockito.when(idService.newId()).thenReturn("test-id");
        Mockito.when(feedsRepo.findById("1")).thenReturn(Optional.of(feed));

        SiloService siloService = new SiloService(silosRepo, idService, feedsRepo);

        // WHEN
        Silo actual = siloService.addSilo(siloDto);

        // THEN
        Mockito.verify(silosRepo).save(silo);
        Mockito.verify(idService).newId();

        Silo expected =  new Silo("test-id", 1, 10, 2.5, new ArrayList<Feed>(List.of(feed)));

        assertEquals(expected, actual);
    }

    @Test
    void updateSiloTest_returnSilo(){

        String id = "test-id";
        String feedId ="feed-id";

        Feed feed = new Feed(feedId, "2220", "starter", "desc", 0.5);

        Silo silo = new Silo("test-id", 1, 10, 2.5, new ArrayList<Feed>(List.of(feed)));

        SiloDto siloDto = new SiloDto( 1, 10, 2.5, new String[]{feedId});

        Mockito.when(silosRepo.save(Mockito.any())).thenReturn(silo);
        Mockito.when(silosRepo.findById(id)).thenReturn(Optional.of(silo));
        Mockito.when(feedsRepo.findById(feedId)).thenReturn(Optional.of(feed));

        SiloService siloService = new SiloService(silosRepo, idService, feedsRepo);

         // WHEN
         Silo actual = siloService.updateSilo(id, siloDto);

         //THEN
         assertEquals(silo, actual);
         Mockito.verify(silosRepo, Mockito.times(1)).save(silo);
         Mockito.verify(silosRepo, Mockito.times(1)).findById(id);
         Mockito.verify(feedsRepo, Mockito.times(1)).findById(feedId);

    }


    @Test
    void deleteSiloTest_returnSilo(){

         String id = "1";
         Feed feed = new Feed("1", "2220", "starter", "desc", 0.5);
         Silo silo = new Silo(id, 1, 10, 2.5, new ArrayList<Feed>(List.of(feed)));

         // GIVEN
         Mockito.when(silosRepo.findById(id)).thenReturn(Optional.of(silo));

         SiloService siloService = new SiloService(silosRepo, idService, feedsRepo);
         Silo actual = siloService.deleteSiloById(id);

        // WHEN
        assertEquals(silo, actual);
        Mockito.verify(silosRepo, Mockito.times(1)).findById(id);
        Mockito.verify(silosRepo, Mockito.times(1)).delete(silo);
        Mockito.verifyNoMoreInteractions(silosRepo);

    }


}
