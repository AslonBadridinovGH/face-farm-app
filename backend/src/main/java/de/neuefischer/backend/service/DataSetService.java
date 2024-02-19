package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.modul.Dataset;
import de.neuefischer.backend.repository.DataRepo;
import de.neuefischer.backend.repository.DataSetRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DataSetService {

    private final DataSetRepo dataRepo;
    private final IdService idService;

    public DataSetService(DataSetRepo dataRepo, IdService idService) {
        this.dataRepo = dataRepo;
        this.idService = idService;
    }

    public List<Dataset> getDataSet() {
        return dataRepo.findAll();
    }

    public Dataset addDataSet(Dataset data) {

        String id = idService.newId();

        return dataRepo.save(data);
    }

}
