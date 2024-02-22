package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.*;
import de.neuefischer.backend.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;


@Service
public class ConsumeService {

    private final ConsumeRepo userDataRepo;
    private final ConsumeDataRepo dataRepo;
    private final ConsumeDataSetRepo dataSetRepo ;

    public ConsumeService(ConsumeRepo userDataRepo, ConsumeDataRepo dataRepo, ConsumeDataSetRepo dataSetRepo ) {
        this.userDataRepo = userDataRepo;
        this.dataRepo = dataRepo;
        this.dataSetRepo = dataSetRepo;
    }

    public Consume getConsume() {
        return userDataRepo.findAll().stream().findFirst().orElseThrow();
    }

    public Consume addConsume() {

        String stringId = UUID.randomUUID().toString();
        List<ConsumeData> allData = dataRepo.findAll();
        List<String> labels = allData.stream().map(ConsumeData::date).toList();

        List<ConsumeDataset> datasetList = dataSetRepo.findAll();
        Consume userDataType = new Consume(stringId, labels, datasetList);
        return userDataRepo.save(userDataType);
    }


}
