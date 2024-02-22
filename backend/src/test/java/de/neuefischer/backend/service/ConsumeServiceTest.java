package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.Consume;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeDataSetRepo;
import de.neuefischer.backend.repository.ConsumeRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.ArrayList;
import java.util.List;


public class ConsumeServiceTest {

    ConsumeRepo consumeRepo =  Mockito.mock(ConsumeRepo.class);
    ConsumeDataRepo dataRepo =  Mockito.mock(ConsumeDataRepo.class);
    ConsumeDataSetRepo dataSetRepo =  Mockito.mock(ConsumeDataSetRepo.class);
    IdService idService = Mockito.mock(IdService.class);

    @Test
    void getConsumeTest_returnsConsume(){

        ConsumeDataset consumeDataset= new ConsumeDataset(
                "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);
        dataSetRepo.save(consumeDataset);

        ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);
        dataRepo.save(data);

        Consume consume = new Consume("1", new ArrayList<>(List.of("2020.01.12")), new ArrayList<>(List.of(consumeDataset)));
        consumeRepo.save(consume);

        Mockito.when(consumeRepo.findAll()).thenReturn(List.of(consume));
        ConsumeService consumeService = new ConsumeService(consumeRepo,dataRepo,dataSetRepo,idService);
        Consume actual = consumeService.getConsume();
        Assertions.assertEquals(actual, consume);

    }

    @Test
    void addConsumeTest_returnConsume(){

        ConsumeDataset dataset= new ConsumeDataset(
                "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);
        ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);
        Consume consume = new Consume("test-id", new ArrayList<>(List.of("2020.01.12")), new ArrayList<>(List.of(dataset)));

        Mockito.when(dataRepo.findAll()).thenReturn(List.of(data));
        Mockito.when(dataSetRepo.findAll()).thenReturn(List.of(dataset));
        Mockito.when(consumeRepo.save(consume)).thenReturn(consume);
        Mockito.when(idService.newId()).thenReturn("test-id");

        ConsumeService consumeService = new ConsumeService(consumeRepo, dataRepo, dataSetRepo, idService);
        Consume actual = consumeService.addConsume();
        Assertions.assertEquals(consume, actual);
        Mockito.verify(dataRepo,Mockito.times(1)).findAll();
        Mockito.verify(dataSetRepo,Mockito.times(1)).findAll();
        Mockito.verify(consumeRepo,Mockito.times(1)).save(consume);
        Mockito.verifyNoMoreInteractions(consumeRepo);
    }
}
