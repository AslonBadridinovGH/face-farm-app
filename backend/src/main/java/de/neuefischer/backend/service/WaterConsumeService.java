package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.WaterConsume;
import de.neuefischer.backend.modul.WaterData;
import de.neuefischer.backend.modul.WaterDataset;
import de.neuefischer.backend.repository.WaterConsumeRepo;
import de.neuefischer.backend.repository.WaterDataRepo;
import de.neuefischer.backend.repository.WaterDataSetRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class WaterConsumeService {

    private final WaterConsumeRepo waterConsumeRepo;
    private final WaterDataRepo dataRepo;
    private final WaterDataSetRepo dataSetRepo ;

    public WaterConsumeService(WaterConsumeRepo waterConsumeRepo, WaterDataRepo dataRepo, WaterDataSetRepo dataSetRepo ) {
        this.waterConsumeRepo = waterConsumeRepo;
        this.dataRepo = dataRepo;
        this.dataSetRepo = dataSetRepo;
    }

    public WaterConsume getWaterConsume() {
        return waterConsumeRepo.findAll().stream().findFirst().orElseThrow();
    }

    public WaterConsume addWaterConsume() {

        List<WaterDataset> datasetList = dataSetRepo.findAll();
        List<WaterData> allData = dataRepo.findAll();
        List<String> labels = allData.stream().map(WaterData::date).toList();

        String stringId = UUID.randomUUID().toString();
        WaterConsume userDataType = new WaterConsume(stringId, labels, datasetList);
        return waterConsumeRepo.save(userDataType);
    }

}
