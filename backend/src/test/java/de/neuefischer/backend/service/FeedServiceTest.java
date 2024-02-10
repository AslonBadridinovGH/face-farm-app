package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.FeedDto;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.repository.FeedsRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FeedServiceTest {

    FeedsRepo feedsRepo = Mockito.mock(FeedsRepo.class);
    IdService idService = Mockito.mock(IdService.class);


    @Test
    void getFeedTest_returnListOfAllFeed(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        // GIVEN
        Mockito.when(feedsRepo.findAll()).thenReturn(
                List.of(
                new Feed("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Feed("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
               )
        );

        FeedService feedService = new FeedService(feedsRepo, idService);

        // WHEN
        List<Feed> actual = feedService.getFeeds();

        // THEN
        assertEquals(List.of(
                new Feed("1", "classic", 0.5, 2.8, 40,
                        1.6, "kwh", date),
                new Feed("2", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date)
        ), actual);

        Mockito.verify(feedsRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(feedsRepo);
    }

    @Test
    void getFeedByIdTest_returnOneFeed(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);

        // GIVEN
         String expectedId = "1";

         Mockito.when(feedsRepo.findById(expectedId)).thenReturn(Optional.of(

         new Feed("1","ross308", 0.5, 2.8, 40,
                1.6, "kwh", localDate)
         ));
        FeedService feedService = new FeedService(feedsRepo, idService);

        //WHEN
        Feed actual = feedService.getById(expectedId);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expectedId, actual.id());
    }

    @Test
    void addFeedTest_returnFeed(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        String dateString = "2024-02-12";

        FeedDto feedDto = new FeedDto("ross308", 0.5, 2.8, 40,
                1.6, "kwh", dateString);


        Feed feed =  new Feed("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
        Mockito.when(feedsRepo.save(feed)).thenReturn(feed);
        Mockito.when(idService.newId()).thenReturn("test-id");

        FeedService feedService = new FeedService(feedsRepo, idService);

        // WHEN
        Feed actual = feedService.addFeed(feedDto);

        // THEN
        Mockito.verify(feedsRepo).save(feed);
        Mockito.verify(idService).newId();

        Feed expected =  new Feed("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        assertEquals(expected, actual);

    }

    @Test
    void updateFeedTest_returnFeed(){

        LocalDate date = LocalDate.of(2024, 2, 12);

        Feed updateFeed =  new Feed("test-id", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        Mockito.when(feedsRepo.save(Mockito.any())).thenReturn(updateFeed);

        FeedService feedService = new FeedService(feedsRepo, idService);

        // WHEN
        Feed actual = feedService.updateFeed(updateFeed);

        //THEN
         assertEquals(updateFeed, actual);
         Mockito.verify(feedsRepo, Mockito.times(1)).save(updateFeed);
         Mockito.verifyNoMoreInteractions(feedsRepo);



    }

    @Test
    void deleteFeedTest_returnFeed(){

        String id = "1";
        LocalDate date = LocalDate.of(2024, 2, 12);

        Feed feed = new Feed("1", "ross308", 0.5, 2.8, 40,
                1.6, "kwh", date);

        // GIVEN
         Mockito.when(feedsRepo.findById(id)).thenReturn(Optional.of(feed));

         FeedService feedService = new FeedService(feedsRepo, idService);
         Feed actual = feedService.deleteFeedById(id);

        // WHEN

        assertEquals(feed, actual);

        Mockito.verify(feedsRepo, Mockito.times(1)).findById(id);
        Mockito.verify(feedsRepo, Mockito.times(1)).delete(feed);
        Mockito.verifyNoMoreInteractions(feedsRepo);

    }


}
