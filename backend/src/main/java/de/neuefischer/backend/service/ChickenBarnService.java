package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.ChickenBarnDto;
import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.ChickenBarnsRepo;
import de.neuefischer.backend.repository.ChickensRepo;
import de.neuefischer.backend.repository.SilosRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class ChickenBarnService {

    private final ChickenBarnsRepo chickenBarnsRepo;
    private final IdService idService;
    private final ChickensRepo chickensRepo;
    private final SilosRepo silosRepo;

    public ChickenBarnService(ChickenBarnsRepo chickenBarnsRepo, IdService idService, ChickensRepo chickensRepo,SilosRepo silosRepo) {
        this.chickenBarnsRepo = chickenBarnsRepo;
        this.chickensRepo = chickensRepo;
        this.silosRepo = silosRepo;
        this.idService = idService;
    }


    public List<ChickenBarn> getChickenBarns() {
        return chickenBarnsRepo.findAll();
    }

    public ChickenBarn getById(String id) {
        Optional<ChickenBarn> byId = chickenBarnsRepo.findById(id);
        if (byId.isPresent()){
            return byId.get();
        }
        throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No chicken Barn with such id!: " +id));
    }

    public ChickenBarn addChickenBarn(ChickenBarnDto chickenBarnDto) {

        String [] strings = chickenBarnDto.chickensIds();
        List<Chicken> chickenList = new ArrayList<>();

        for (String string : strings) {
            Optional<Chicken> byId = chickensRepo.findById(string);
            if (byId.isEmpty()) {
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No chicken with such id: "+string));
            }
            Chicken chicken = byId.get();
            chickenList.add(chicken);
        }

        String[] silosIds = chickenBarnDto.silosIds();
        List<Silo> silosList = new ArrayList<>();
        for (String silosId : silosIds) {
            Optional<Silo> byId = silosRepo.findById(silosId);
            if (byId.isEmpty()) {
                throw (new ResponseStatusException(HttpStatus.NOT_FOUND, "No silo with such id: "+silosId));
            }
            silosList.add(byId.get());
        }
         String id = idService.newId();
        ChickenBarn chickenBarn = new ChickenBarn(
        id, chickenBarnDto.area(),chickenBarnDto.name(), chickenList,
        chickenBarnDto.amountOfChickens(), chickenBarnDto.capacityForChickens(), silosList);
        return chickenBarnsRepo.save(chickenBarn);
    }

    public ChickenBarn updateChickenBarn(ChickenBarn chicken){
         return chickenBarnsRepo.save(chicken);
    }

    public ChickenBarn deleteChickenBarnById(String id) {

        Optional<ChickenBarn> byId = chickenBarnsRepo.findById(id);
        if (byId.isPresent()){
            chickenBarnsRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
