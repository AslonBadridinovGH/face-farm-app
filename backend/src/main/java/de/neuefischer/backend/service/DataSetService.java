package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.Dataset;
import de.neuefischer.backend.repository.DataSetRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DataSetService {

    private final DataSetRepo dataSetRepo;
    private final IdService idService;


    public DataSetService(DataSetRepo dataSetRepo, IdService idService) {
        this.dataSetRepo = dataSetRepo;
        this.idService = idService;
    }

    public List<Dataset> getDataSet() {
        return dataSetRepo.findAll();
    }

    public Dataset addDataSet(Dataset dataset) {

        String id = idService.newId();
        Dataset datasetToSave = dataset.withId(id);
        return dataSetRepo.save(datasetToSave);
    }

}
