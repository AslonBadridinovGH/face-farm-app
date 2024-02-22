package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.WaterDataset;
import de.neuefischer.backend.repository.WaterDataSetRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WaterDataSetService {

    private final WaterDataSetRepo dataSetRepo;
    private final IdService idService;


    public WaterDataSetService(WaterDataSetRepo dataSetRepo, IdService idService) {
        this.dataSetRepo = dataSetRepo;
        this.idService = idService;
    }

    public List<WaterDataset> getWaterDataSet() {
        return dataSetRepo.findAll();
    }

    public WaterDataset addWaterDataSet(WaterDataset dataset) {

        String id = idService.newId();
        WaterDataset datasetToSave = dataset.withId(id);
        return dataSetRepo.save(datasetToSave);
    }

}
