package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FarmDto;
import de.neuefischer.backend.modul.Farm;
import de.neuefischer.backend.repository.ChickenBarnsRepo;
import de.neuefischer.backend.repository.FarmsRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class FarmServiceTest {

    FarmsRepo farmsRepo = Mockito.mock(FarmsRepo.class);
    ChickenBarnsRepo chickenBarnsRepo = Mockito.mock(ChickenBarnsRepo.class);
    IdService idService = Mockito.mock(IdService.class);


    @Test
    void getFarmTest_returnListOfAllFarm(){

        // GIVEN
        Mockito.when(farmsRepo.findAll()).thenReturn(
                List.of(
                   new Farm("1", "barnstorf", "broiler", "markstr", 10.5, 2020, 1000),
                   new Farm("2", "vechta", "broiler", "markstr", 10.5, 2020, 1000)
               )
        );

        FarmService farmService = new FarmService(farmsRepo,chickenBarnsRepo,idService);

        // WHEN
        List<Farm> actual = farmService.getFarm();

        // THEN
        assertEquals(List.of(
                new Farm("1", "barnstorf", "broiler", "markstr", 10.5, 2020, 1000),
                new Farm("2", "vechta", "broiler", "markstr", 10.5, 2020, 1000)
        ), actual);

        Mockito.verify(farmsRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(farmsRepo);
    }

    @Test
    void addFarmDtoTest_returnFarm(){

        FarmDto farmDto = new FarmDto(  "barnstorf", "broiler", "markstr", "10.5", 2020);
        Farm farm = new Farm("test-id", "barnstorf", "broiler", "markstr", 10.5, 2020, 0);

        // GIVEN
        Mockito.when(farmsRepo.save(farm)).thenReturn(farm);
        Mockito.when(idService.newId()).thenReturn("test-id");
        FarmService farmService = new FarmService(farmsRepo, chickenBarnsRepo, idService);


        // WHEN
        Farm actual = farmService.addFarmInfos(farmDto);

        // THEN
        Mockito.verify(farmsRepo).save(farm);
        Mockito.verify(idService).newId();

        Farm expected = new Farm("test-id", "barnstorf", "broiler", "markstr", 10.5, 2020, 0);
        assertEquals(expected, actual);
    }


    @Test
    void updateFarmTest_returnFarm(){

        String id = "test-id";

        Farm farm = new Farm("test-id", "barnstorf", "broiler", "markstr", 10.5, 2020, 0);

        FarmDto farmDto = new FarmDto(  "barnstorf", "broiler", "markstr", "10.5", 2020);

        Mockito.when(farmsRepo.save(Mockito.any())).thenReturn(farm);
        Mockito.when(farmsRepo.findById(id)).thenReturn(Optional.of(farm));

        FarmService farmService = new FarmService(farmsRepo, chickenBarnsRepo ,idService);

         // WHEN
         Farm actual = farmService.updateFarmInfo(id, farmDto);

         //THEN
         assertEquals(farm, actual);
         Mockito.verify(farmsRepo, Mockito.times(1)).save(farm);
         Mockito.verify(farmsRepo, Mockito.times(1)).findById(id);

    }


    @Test
    void deleteFarmTest_returnFarm(){

         String id = "1";
         Farm farm = new Farm("test-id", "barnstorf", "broiler", "markstr", 10.5, 2020, 0);

         // GIVEN
         Mockito.when(farmsRepo.findById(id)).thenReturn(Optional.of(farm));

         FarmService farmService = new FarmService(farmsRepo, chickenBarnsRepo, idService);
         Farm actual = farmService.deleteFarmById(id);

        // WHEN
        assertEquals(farm, actual);
        Mockito.verify(farmsRepo, Mockito.times(1)).findById(id);
        Mockito.verify(farmsRepo, Mockito.times(1)).delete(farm);
        Mockito.verifyNoMoreInteractions(farmsRepo);

    }

}
