package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Consume;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.modul.ConsumeDataset;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import de.neuefischer.backend.repository.ConsumeRepo;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class ConsumeDataContIntegrationsTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private ConsumeDataRepo consumeRepo;

    @DirtiesContext
    @Test
    void getConsumeDataTest_shouldReturnListWithOneObjectWhenOneObjectSavedInRpo() throws Exception {

          ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);
          consumeRepo.save(data);

         mvc.perform(MockMvcRequestBuilders.get("/api/consumeData"))
                 .andExpect(status().isOk())
                 .andExpect(MockMvcResultMatchers.content().json("""

                 [            {
                                  "id": 1,
                                  "date": "2020.01.12",
                                  "feedConsume": 300,
                                   "waterConsume": 400
                              }
                 ]
                         
                        """));
    }

    @DirtiesContext
    @Test
    void addConsumeDataTest_shouldReturnWithOneObjectWhenSavedInRepo() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/consumeData")
                        .contentType(MediaType.APPLICATION_JSON)
                .content("""
                                                    {
                                  "id": 1,
                                  "date": "2020.01.12",
                                  "feedConsume": 300,
                                   "waterConsume": 400
                            }
                        """
                ))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                                  "id": 1,
                                  "date": "2020.01.12",
                                  "feedConsume": 300,
                                   "waterConsume": 400
                            }

         """)
        );



    }

}
