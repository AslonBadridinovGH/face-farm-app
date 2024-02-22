package de.neuefischer.backend.controller;
import de.neuefischer.backend.modul.ConsumeData;
import de.neuefischer.backend.repository.ConsumeDataRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
 class ConsumeDataContIntegrationsTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private ConsumeDataRepo consumeDataRepo;

    @DirtiesContext
    @Test
    void getConsumeDataTest_shouldReturnListWithOneObjectWhenOneObjectSavedInRpo() throws Exception {

          ConsumeData data = new ConsumeData(1,"2020.01.12", 300,400);
        consumeDataRepo.save(data);

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
