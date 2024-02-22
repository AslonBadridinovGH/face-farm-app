package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Consume;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeDataSetRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class ConsumeDataSetContIntegrationsTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private ConsumeDataSetRepo consumeRepo;

    @DirtiesContext
    @Test
    void getConsumeDataTest_shouldReturnListWithOneObjectWhenOneObjectSavedInRpo() throws Exception {

        ConsumeDataset consumeDataset= new ConsumeDataset(
                "1", "label", new ArrayList<>(List.of(1,2,3)), new ArrayList<>(List.of("1","2","3")),"color",2);
        consumeRepo.save(consumeDataset);


         mvc.perform(MockMvcRequestBuilders.get("/api/consumeDataSet"))
                 .andExpect(status().isOk())
                 .andExpect(MockMvcResultMatchers.content().json("""

                         [    
                                  {
                                         "id" : "1",
                                         "label" : "label",
                                         "data" : [1, 2, 3],
                                         "backgroundColor" : ["1","2","3"],
                                         "borderColor" : "color",
                                         "borderWidth" : 2
                                  }
                         ]
                         
                        """));
    }

    @DirtiesContext
    @Test
    void addConsumeDataTest_shouldReturnWithOneObjectWhenSavedInRepo() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/consumeDataSet")
                        .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                                       
                                         "label" : "label",
                                         "data" : [1, 2, 3],
                                         "backgroundColor" : ["1","2","3"],
                                         "borderColor" : "color",
                                         "borderWidth" : 2
                            }
                        """
                ))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                                         
                                         "label" : "label",
                                         "data" : [1, 2, 3],
                                         "backgroundColor" : ["1","2","3"],
                                         "borderColor" : "color",
                                         "borderWidth" : 2
                            }      

         """)
        ).andExpect(jsonPath("$.id").isNotEmpty());



    }

}
