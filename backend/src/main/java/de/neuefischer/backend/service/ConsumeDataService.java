package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ConsumeDataService {


    private final ConsumeDataRepo dataRepo;

    public ConsumeDataService(ConsumeDataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    public List<ConsumeData> getConsumeData() {
        return dataRepo.findAll();
    }

    public ConsumeData addConsumeData(ConsumeData data) {
        return dataRepo.save(data);
    }

}
