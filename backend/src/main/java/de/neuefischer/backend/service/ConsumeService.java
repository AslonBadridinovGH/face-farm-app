package de.neuefischer.backend.service;

import de.neuefischer.backend.modul.*;
import de.neuefischer.backend.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;


@Service
public class ConsumeService {

    private final ConsumeRepo consumeRepo;
    private final ConsumeDataRepo dataRepo;
    private final ConsumeDataSetRepo dataSetRepo ;
    private final IdService idService;

    public ConsumeService(ConsumeRepo consumeRepo, ConsumeDataRepo dataRepo, ConsumeDataSetRepo dataSetRepo,IdService idService) {
        this.consumeRepo = consumeRepo;
        this.dataRepo = dataRepo;
        this.dataSetRepo = dataSetRepo;
        this.idService = idService;
    }

    public Consume getConsume() {
        return consumeRepo.findAll().stream().findFirst().orElseThrow();
    }

    public Consume addConsume() {

        String stringId = idService.newId();
        List<ConsumeData> allData = dataRepo.findAll();
        List<String> labels = allData.stream().map(ConsumeData::date).toList();

        List<ConsumeDataset> datasetList = dataSetRepo.findAll();
        Consume consume1 = new Consume(stringId, labels, datasetList);
        return consumeRepo.save(consume1);
    }



}
