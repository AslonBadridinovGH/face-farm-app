package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.WaterData;
import de.neuefischer.backend.repository.WaterDataRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WaterDataService {

    private final WaterDataRepo dataRepo;


    public WaterDataService(WaterDataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    public List<WaterData> getWaterData() {
        return dataRepo.findAll();
    }

    public WaterData addWaterData(WaterData data) {
        return dataRepo.save(data);
    }

}
