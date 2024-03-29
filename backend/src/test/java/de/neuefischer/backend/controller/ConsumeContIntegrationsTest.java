package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.Consume;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeDataSetRepo;
import de.neuefischer.backend.repository.ConsumeRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.ArrayList;
import java.util.List;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



@SpringBootTest
@AutoConfigureMockMvc
class ConsumeContIntegrationsTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private ConsumeRepo consumeRepo;

    @Autowired
    private ConsumeDataSetRepo dataSetRepo;

    @Autowired
    private ConsumeDataRepo dataRepo;

    @DirtiesContext
    @Test
    void getConsumeTest_shouldReturnOneObjectWhenOneObjectSavedInRpo() throws Exception {

         ConsumeDataset consumeDataset= new ConsumeDataset(
         "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);

         Consume consume = new Consume("1",new ArrayList<>(List.of("label1", "label2")), new ArrayList<>(List.of(consumeDataset)));
         consumeRepo.save(consume);


         mvc.perform(MockMvcRequestBuilders.get("/api/consume"))
                 .andExpect(status().isOk())
                 .andExpect(MockMvcResultMatchers.content().json("""

                              {
                                 "id": "1",
                                  "labels": ["label1","label2"],
                                  "datasets": [
                                        {
                                          "id" : "1",
                                          "label" : "label",
                                           "data" : [1, 2, 3],
                                           "backgroundColor" : ["1","2","3"],
                                           "borderColor" : "color",
                                           "borderWidth" : 2
                                        }
                                  ]
                              }
                         
                        """));
    }

    @DirtiesContext
    @Test
    void addConsumeTest_shouldReturnOneObjectWhenOneObjectSavedInRpo() throws Exception {

         ConsumeDataset consumeDataset= new ConsumeDataset(
         "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);
         dataSetRepo.save(consumeDataset);

         ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);
         dataRepo.save(data);

         Consume consume = new Consume("1", new ArrayList<>(List.of("2020.01.12")), new ArrayList<>(List.of(consumeDataset)));
         consumeRepo.save(consume);


         mvc.perform(MockMvcRequestBuilders.post("/api/consume"))
                 .andExpect(status().isOk())
                 .andExpect(MockMvcResultMatchers.content().json("""

                              {
                        
                                  "labels": ["2020.01.12"],
                                  "datasets": [
                                        {
                                          "label" : "label",
                                           "data" : [1, 2, 3],
                                           "backgroundColor" : ["1","2","3"],
                                           "borderColor" : "color",
                                           "borderWidth" : 2
                                        }
                                  ]
                              }
                         
                        """))
                    .andExpect(jsonPath("$.id").isNotEmpty());
    }




}
