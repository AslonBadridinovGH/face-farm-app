package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.repository.DataRepo;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class DataService {

    private final DataRepo dataRepo;


    public DataService(DataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    public List<Data> getData() {
        return dataRepo.findAll();
    }

    public Data addData(Data data) {
        return dataRepo.save(data);
    }

}
