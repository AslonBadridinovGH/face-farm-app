package de.neuefischer.backend.service;
import de.neuefischer.backend.modul.Data;
import de.neuefischer.backend.modul.Dataset;
import de.neuefischer.backend.modul.UserDataType;
import de.neuefischer.backend.repository.DataRepo;
import de.neuefischer.backend.repository.DataSetRepo;
import de.neuefischer.backend.repository.UserDataRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;


@Service
public class UserDataService {

    private final UserDataRepo userDataRepo;
    private final DataRepo dataRepo;
    private final DataSetRepo dataSetRepo ;

    public UserDataService(UserDataRepo userDataRepo, DataRepo dataRepo, DataSetRepo dataSetRepo ) {
        this.userDataRepo = userDataRepo;
        this.dataRepo = dataRepo;
        this.dataSetRepo = dataSetRepo;
    }

    public UserDataType getUserData() {
        return userDataRepo.findAll().stream().findFirst().orElseThrow();
    }

    public UserDataType addUserData() {

        List<Dataset> datasetList = dataSetRepo.findAll();
        List<Data> allData = dataRepo.findAll();
        List<Integer> labels = allData.stream().map(Data::year).toList();

        String stringId = UUID.randomUUID().toString();
        UserDataType userDataType = new UserDataType(stringId, labels, datasetList);
        return userDataRepo.save(userDataType);
    }


}
