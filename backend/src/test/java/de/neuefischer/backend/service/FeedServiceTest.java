package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FeedDto;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.repository.FeedsRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FeedServiceTest {

    FeedsRepo feedsRepo = Mockito.mock(FeedsRepo.class);
    IdService idService = Mockito.mock(IdService.class);


    @Test
    void getFeedTest_returnListOfAllFeed(){

        // GIVEN
        Mockito.when(feedsRepo.findAll()).thenReturn(
                List.of(new Feed("1", "2220", "starter", "desc", 0.5))
        );

        FeedService feedService = new FeedService(feedsRepo, idService);

        // WHEN
        List<Feed> actual = feedService.getFeeds();

        // THEN
        assertEquals(
           List.of(new Feed("1", "2220", "starter", "desc", 0.5)), actual);

        Mockito.verify(feedsRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(feedsRepo);
    }

  @Test
    void getFeedByIdTest_returnOneFeed(){


        // GIVEN
         String expectedId = "1";

         Mockito.when(feedsRepo.findById(expectedId)).thenReturn(Optional.of(
                 new Feed("1", "2220", "starter", "desc", 0.5)
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


        FeedDto feedDto =  new FeedDto( "2220", "starter", "desc", 0.5);

              Feed feed = new Feed("test-id", "2220", "starter", "desc", 0.5);

        // GIVEN
        Mockito.when(feedsRepo.save(feed)).thenReturn(feed);
        Mockito.when(idService.newId()).thenReturn("test-id");

        FeedService feedService = new FeedService(feedsRepo, idService);

        // WHEN
        Feed actual = feedService.addFeed(feedDto);

        // THEN
        Mockito.verify(feedsRepo).save(feed);
        Mockito.verify(idService).newId();

        Feed expected =  new Feed("test-id", "2220", "starter", "desc", 0.5);

        assertEquals(expected, actual);

    }


    @Test
    void updateFeedTest_returnFeed(){

        Feed updateFeed = new Feed("test-id", "2220", "starter", "desc", 0.5);

        Mockito.when(feedsRepo.save(updateFeed)).thenReturn(updateFeed);

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

        // GIVEN
        String id = "1";

        Feed feed = new Feed(id, "2220", "starter", "desc", 0.5);
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
