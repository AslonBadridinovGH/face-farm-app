package de.neuefischer.backend.service;
import de.neuefischer.backend.dto.FatteningPeriodDto;
import de.neuefischer.backend.modul.*;
import de.neuefischer.backend.repository.ChickensRepo;
import de.neuefischer.backend.repository.FatteningPeriodsRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class FatteningPeriodServiceTest {

    FatteningPeriodsRepo fatPeriodsRepo = Mockito.mock(FatteningPeriodsRepo.class);
    IdService idService = Mockito.mock(IdService.class);
    ChickensRepo chickensRepo=Mockito.mock(ChickensRepo.class);



    @Test
    void getFatteningPeriodTest_returnListOfAllFatteningPeriod(){

        FatteningPeriod fatPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2024,2,21),
                LocalDate.of(2024,2,24),
                4L,"starter", 12,
                12, LocalDate.of(2024,12,20));

        // GIVEN
        when(fatPeriodsRepo.findAll()).thenReturn(
                List.of(fatPeriod));

        FatteningPeriodService chickenBarnService = new FatteningPeriodService( idService, fatPeriodsRepo, chickensRepo);

        // WHEN
        List<FatteningPeriod> actual = chickenBarnService.getFatteningPeriods();

        // THEN
        assertEquals(
                List.of(fatPeriod), actual);

        Mockito.verify(fatPeriodsRepo, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(fatPeriodsRepo);
    }


    @Test
    void getFatteningPeriodByIdTest_returnOneFatteningPeriod(){


        // GIVEN
         String expectedId = "1";

        Mockito.when(fatPeriodsRepo.findById(expectedId)).thenReturn(Optional.of(

                 new FatteningPeriod(
                         "1", new ArrayList<>(),
                         LocalDate.of(2024,2,21),
                         LocalDate.of(2024,2,24),
                         4L,"starter", 12,
                         12, LocalDate.of(2024,12,20))
         ));

        FatteningPeriodService chickenBarnService = new FatteningPeriodService( idService, fatPeriodsRepo, chickensRepo);

        //WHEN
        FatteningPeriod actual = chickenBarnService.getById(expectedId);

        // THEN
        Assertions.assertNotNull(actual);
        Assertions.assertEquals(expectedId, actual.id());
    }


    @Test
    void addFatteningPeriodTest_returnFatteningPeriod(){

        LocalDate localDate = LocalDate.of(2024, 2, 12);
        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40, 1.6, "kwh", localDate);
        LocalDate startDate = LocalDate.of(2024, 2, 20);
        LocalDate slaughterDay = LocalDate.of(2024, 12, 21);

        long old = Period.between(Objects.requireNonNull(startDate), LocalDate.now()).get(ChronoUnit.DAYS);

        FatteningPeriod fatPeriod = new FatteningPeriod(
                "test-id", new ArrayList<>(List.of(chicken)),
                startDate,
                LocalDate.now(),
                old,"Aufzucht", 12,
                12, slaughterDay );

         FatteningPeriodDto fatteningPeriodDto = new FatteningPeriodDto(
                "1", new ArrayList<>(List.of("1")), 12, "2024-02-20", "2024-12-21");

        // GIVEN
        String id = "1";
        when(idService.newId()).thenReturn("test-id");
        when(chickensRepo.findById(id)).thenReturn(Optional.of(chicken));
        when(fatPeriodsRepo.save(fatPeriod)).thenReturn(fatPeriod);

        FatteningPeriodService fatteningPeriodService = new FatteningPeriodService( idService, fatPeriodsRepo, chickensRepo);

        // WHEN
        FatteningPeriod actual = fatteningPeriodService.addFatteningPeriod(fatteningPeriodDto);


        // THEN
        Mockito.verify(chickensRepo, Mockito.times(1) ).findById(id);
        Mockito.verify(fatPeriodsRepo, Mockito.times(1)).save(fatPeriod);
        Mockito.verify(idService).newId();

        assertEquals(fatPeriod, actual);

    }


    @Test
    void updateFatteningPeriodTest_returnUpdatedFatteningPeriod(){


        String id = "test-id";
        Chicken chicken = new Chicken("1", "ross308", 0.5, 2.8, 40, 1.6, "kwh", LocalDate.now());

        LocalDate startDate = LocalDate.of(2024, 2, 10);
        long old = Period.between(Objects.requireNonNull(startDate), LocalDate.now()).get(ChronoUnit.DAYS);

        FatteningPeriod fatPeriod = new FatteningPeriod(
                "test-id", new ArrayList<>(),
                 startDate,
                 LocalDate.now(), old,"Aufzucht", 12,
                 24, LocalDate.of(2024,2,22));



        LocalDate editedStartDate = LocalDate.of(2024, 2, 20);
        long oldEdited = Period.between(Objects.requireNonNull(editedStartDate), LocalDate.now()).get(ChronoUnit.DAYS);

        FatteningPeriod expected = new FatteningPeriod(
                "test-id", new ArrayList<>(List.of(chicken)),
                editedStartDate,
                LocalDate.now(),
                oldEdited,"Aufzucht", 12,
                36, LocalDate.of(2024, 12, 21) );

        FatteningPeriodDto fatPeriodDto = new FatteningPeriodDto(
                "1", new ArrayList<>(List.of("1")), 12, "2024-02-20", "2024-12-21");


        // GIVEN
         Mockito.when(fatPeriodsRepo.findById(id)).thenReturn(Optional.of(fatPeriod));
         Mockito.when(chickensRepo.findById("1")).thenReturn(Optional.of(chicken));
         Mockito.when(idService.newId()).thenReturn("test-id");

         FatteningPeriodService fatteningPeriodService = new FatteningPeriodService(idService, fatPeriodsRepo, chickensRepo);

         // WHEN
         FatteningPeriod actual = fatteningPeriodService.updateFatteningPeriod(id, fatPeriodDto);

         Mockito.verify(fatPeriodsRepo, Mockito.times(1)).findById(id);

         // THEN
         Assertions.assertEquals(expected, actual);

    }

    @Test
    void deleteChickenBarnTest_returnChickenBarn(){

        String id = "1";

        FatteningPeriod fatPeriod = new FatteningPeriod("test-id", new ArrayList<>(),
                LocalDate.of(2024,2,21),
                LocalDate.now(), 2L,"starter", 12,
                24, LocalDate.of(2024,2,22));

        // GIVEN
        Mockito.when(fatPeriodsRepo.findById(id)).thenReturn(Optional.of(fatPeriod));

        FatteningPeriodService fatteningPeriodService = new FatteningPeriodService(idService, fatPeriodsRepo, chickensRepo);
        FatteningPeriod actual = fatteningPeriodService.deleteFatteningPeriodById(id);

        // WHEN
        assertEquals(fatPeriod, actual);
        Mockito.verify(fatPeriodsRepo, Mockito.times(1)).delete(fatPeriod);

    }


}
