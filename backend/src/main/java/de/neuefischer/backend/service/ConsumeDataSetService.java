package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.modul.ConsumeDatasetDto;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeDataSetRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ConsumeDataSetService {

    private final ConsumeDataSetRepo dataSetRepo;
    private final IdService idService;


    public ConsumeDataSetService(ConsumeDataSetRepo dataSetRepo, IdService idService) {
        this.dataSetRepo = dataSetRepo;
        this.idService = idService;
    }

    public List<ConsumeDataset> getConsumeDataSet() {
        return dataSetRepo.findAll();
    }

    public ConsumeDataset addConsumeDataSet(ConsumeDataset dataset) {
        String id = idService.newId();
        ConsumeDataset consumeDataset = dataset.withId(id);
        return dataSetRepo.save(consumeDataset);
    }

}
