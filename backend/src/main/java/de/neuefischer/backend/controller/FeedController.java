package de.neuefischer.backend.controller;
import de.neuefischer.backend.dto.FeedDto;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;


    @GetMapping
    public List<Feed> getFeeds(){
        return feedService.getFeeds();
    }

    @GetMapping("/{id}")
    public Feed getFeedById(@PathVariable String id) {
        return feedService.getById(id);
    }

    @PostMapping
    public Feed addFeed(@RequestBody FeedDto feedDto){
        return feedService.addFeed(feedDto);
    }

    @PutMapping("/{id}")
    public Feed updateFeed(@RequestBody Feed feed){
        return feedService.updateFeed(feed);
    }


    @DeleteMapping("/{id}")
    public Feed deleteFeed(@PathVariable String id){
           return feedService.deleteFeedById(id);
    }

}
