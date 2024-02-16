package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FarmDto;
import de.neuefischer.backend.modul.*;
import de.neuefischer.backend.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;



@Service
public class FarmService {

    private final FarmsRepo farmsRepo;
    private final ChickenBarnsRepo chickenBarnsRepo;
    private final IdService idService;

    public FarmService(FarmsRepo silosRepo, ChickenBarnsRepo chickenBarnsRepo, IdService idService) {
        this.farmsRepo = silosRepo;
        this.chickenBarnsRepo = chickenBarnsRepo;
        this.idService = idService;
    }

    public List<Farm> getFarm() {
        return farmsRepo.findAll();
    }

    public Farm addFarmInfos(FarmDto farmDto) {

        int sum = 0;
        List<ChickenBarn> chickenBarns = chickenBarnsRepo.findAll();
        Optional<Integer> reduce = chickenBarns.stream().map(ChickenBarn::amountOfChickens).reduce(Integer::sum);
        if (reduce.isPresent()){
           sum = reduce.get();
        }

        String id = idService.newId();
        Farm farmToSave = new Farm(
            id, farmDto.name(), farmDto.activity(),farmDto.address(), farmDto.area(), farmDto.constructionYear(), sum);
        return farmsRepo.save(farmToSave);
    }


    public Farm updateFarmInfo(String id, FarmDto farmDto){

        Optional<Farm> byId = farmsRepo.findById(id);
        if (byId.isEmpty()){
            throw (new NoSuchElementException());
        }
        Integer amountChickens = 0;
        List<ChickenBarn> all = chickenBarnsRepo.findAll();
        for (ChickenBarn chickenBarn : all) {
            Integer amount = chickenBarn.amountOfChickens();
            amountChickens += amount;
        }
        Farm farmToSave = new Farm(
                id, farmDto.name(), farmDto.activity(),farmDto.address(), farmDto.area(), farmDto.constructionYear(), amountChickens);
        return farmsRepo.save(farmToSave);
    }

    public Farm deleteFarmById(String id) {

        Optional<Farm> byId = farmsRepo.findById(id);
        if (byId.isPresent()){
            farmsRepo.delete(byId.get());
            return byId.get();
        }
        throw (new NoSuchElementException());
    }

}
