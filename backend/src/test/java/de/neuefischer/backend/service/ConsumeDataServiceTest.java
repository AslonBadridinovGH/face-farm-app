package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;


public class ConsumeDataServiceTest {

    ConsumeDataRepo dataRepo =  Mockito.mock(ConsumeDataRepo.class);


    @Test
    void getConsumeDataTest_returnsListOfConsumeData(){

        ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);

        Mockito.when(dataRepo.findAll()).thenReturn(List.of(data));
        ConsumeDataService consumeService = new ConsumeDataService(dataRepo);
        List<ConsumeData> actual = consumeService.getConsumeData();
        Assertions.assertEquals(actual, List.of(data));

        Mockito.verify(dataRepo, Mockito.times(1)).findAll();
    }

    @Test
    void addConsumeDataTest_returnConsumeData(){

        ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);

        Mockito.when(dataRepo.save(data)).thenReturn(data);
        ConsumeDataService consumeDataService = new ConsumeDataService(dataRepo);
        ConsumeData actual = consumeDataService.addConsumeData(data);

        Assertions.assertEquals(data, actual);
        Mockito.verify(dataRepo,Mockito.times(1)).save(data);
        Mockito.verifyNoMoreInteractions(dataRepo);

    }
}
