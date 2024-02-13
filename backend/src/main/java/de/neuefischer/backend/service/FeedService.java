package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FeedDto;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.repository.FeedsRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class FeedService {

    private final FeedsRepo feedsRepo;
    private final IdService idService;

    public FeedService(FeedsRepo feedsRepo, IdService idService) {
        this.feedsRepo = feedsRepo;
        this.idService = idService;
    }


    public List<Feed> getFeeds() {
        return feedsRepo.findAll();
    }

    public Feed getById(String id) {
        Optional<Feed> byId = feedsRepo.findById(id);
        if (byId.isPresent()){
            return byId.get();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No feed with such id!"));
    }

    public Feed addFeed(FeedDto feedDto) {

        String id = idService.newId();
        Feed feed = new Feed(
        id, feedDto.articleNumber(),feedDto.type(),feedDto.description(),
        feedDto.pricePerTone());
        return feedsRepo.save(feed);
    }

    public Feed updateFeed(Feed feed){
         return feedsRepo.save(feed);
    }

    public Feed deleteFeedById(String id) {

        Optional<Feed> byId = feedsRepo.findById(id);
        if (byId.isPresent()){
            feedsRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
