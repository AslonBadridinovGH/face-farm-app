package de.neuefischer.backend.service;

import de.neuefischer.backend.dto.SiloDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.FeedsRepo;
import de.neuefischer.backend.repository.SilosRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class SiloService {

    private final SilosRepo silosRepo;
    private final FeedsRepo feedsRepo;
    private final IdService idService;

    public SiloService(SilosRepo silosRepo, IdService idService, FeedsRepo feedsRepo) {
        this.silosRepo = silosRepo;
        this.feedsRepo = feedsRepo;
        this.idService = idService;
    }


    public List<Silo> getSilos() {
        return silosRepo.findAll();
    }

    public Silo getById(String id) {
        Optional<Silo> byId = silosRepo.findById(id);
        if (byId.isPresent()){
            return byId.get();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No silo with such id!"));
    }

    public Silo addSilo(SiloDto siloDto) {

        String id = idService.newId();

        List<Feed> feedList = new ArrayList<>();
        String[] strings = siloDto.feedIds();

        for (String string : strings) {
            Optional<Feed> byId = feedsRepo.findById(string);
            if (byId.isEmpty()) {
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No silo with such id!"));
            }
            feedList.add(byId.get());
        }

        Silo silo = new Silo(
        id, siloDto.numberOfSilo(),siloDto.capacity(),
        siloDto.amountOfFeed(), feedList);
        return silosRepo.save(silo);
    }

    public Silo updateSilo(String id, SiloDto siloDto){

        Optional<Silo> byId = silosRepo.findById(id);
        if (byId.isEmpty()){
            throw (new NoSuchElementException());
        }

        List<Feed> feedList = new ArrayList<>();
        String[] strings = siloDto.feedIds();
        for (String string : strings) {
            Optional<Feed> feedById = feedsRepo.findById(string);
            if (feedById.isEmpty()){
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No Feed with such id: "+string));
            }
            feedList.add(feedById.get());
        }
        Silo silo = new Silo(id, siloDto.numberOfSilo(), siloDto.capacity(), siloDto.amountOfFeed(),feedList);
        return silosRepo.save(silo);
    }

    public Silo deleteSiloById(String id) {

        Optional<Silo> byId = silosRepo.findById(id);
        if (byId.isPresent()){
            silosRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
