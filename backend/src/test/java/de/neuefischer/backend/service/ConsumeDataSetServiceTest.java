package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeDataSetRepo;
import de.neuefischer.backend.repository.ConsumeRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.ArrayList;
import java.util.List;


public class ConsumeDataSetServiceTest {

    ConsumeRepo consumeRepo =  Mockito.mock(ConsumeRepo.class);
    ConsumeDataSetRepo dataSetRepo =  Mockito.mock(ConsumeDataSetRepo.class);
    IdService idService = Mockito.mock(IdService.class);

    @Test
    void getConsumeDataSetTest_returnsConsumeDataSet(){

        ConsumeDataset consumeDataset = new ConsumeDataset(
                "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);

        Mockito.when(dataSetRepo.findAll()).thenReturn(List.of(consumeDataset));

        ConsumeDataSetService consumeService = new ConsumeDataSetService(dataSetRepo, idService);
        List <ConsumeDataset> actual = consumeService.getConsumeDataSet();
        Assertions.assertEquals(actual, List.of(consumeDataset));

        Mockito.verify(dataSetRepo,Mockito.times(1)).findAll();
    }

    @Test
    void addConsumeDataSetTest_returnConsumeDataSet(){

        ConsumeDataset dataset= new ConsumeDataset(
                "test-id", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);

        Mockito.when(dataSetRepo.save(dataset)).thenReturn(dataset);
        Mockito.when(idService.newId()).thenReturn("test-id");

        ConsumeDataSetService dataSetService = new ConsumeDataSetService(dataSetRepo, idService);
        ConsumeDataset actual = dataSetService.addConsumeDataSet(dataset);
        Assertions.assertEquals(dataset, actual);

        Mockito.verify(dataSetRepo, Mockito.times(1)).save(dataset);
        Mockito.verifyNoMoreInteractions(consumeRepo);
    }

}
