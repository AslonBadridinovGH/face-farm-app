package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.repository.ChickensRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ChickenContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ChickensRepo chickensRepo;

    @DirtiesContext
    @Test
    void getChickensTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

        LocalDate date = LocalDate.of(2024, 2, 12);

        chickensRepo.save(
        new Chicken("1","ross308", 0.4, 2.8, 40, 1.6,
                "kwh", date));

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/chickens"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [
                                
                           {
                                   "id": "1",
                                   "race": "ross308",
                                   "weightInFirstDay": 0.4,
                                   "expectedSlaughterWeight": 2.8,
                                   "expectedSlaughterAge": 40,
                                   "feedConversion": 1.6,
                                   "hatchery": "kwh",
                                   "hatchDay": "2024-02-12"
                           }
                        ]
                         
                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getChickenByIdTest_shouldReturnObjectWithTheId() throws Exception {

        LocalDate date = LocalDate.of(2024, 2, 12);

        Chicken chicken = chickensRepo.save(
                new Chicken("1", "ross308", 0.4, 2.8, 40,
                1.6, "kwh", date));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/chickens/{id}", chicken.id()))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                      {
                                           "id": "1",
                                           "race": "ross308",
                                           "weightInFirstDay": 0.4,
                                           "expectedSlaughterWeight": 2.8,
                                           "expectedSlaughterAge": 40,
                                           "feedConversion": 1.6,
                                           "hatchery": "kwh",
                                           "hatchDay": "2024-02-12"
                                      }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void addChickenTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {

        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/chickens")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
             {
                 "race": "ross308",
                  "weightInFirstDay": 0.4,
                  "expectedSlaughterWeight": 2.8,
                  "expectedSlaughterAge": 40,
                  "feedConversion": 1.6,
                  "hatchery": "kwh",
                  "hatchDay": "2024-02-12"
             }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""

             {
                 "race": "ross308",
                  "weightInFirstDay": 0.4,
                  "expectedSlaughterWeight": 2.8,
                  "expectedSlaughterAge": 40,
                  "feedConversion": 1.6,
                  "hatchery": "kwh",
                  "hatchDay": "2024-02-12"
             }
"""))
                .andExpect(jsonPath("$.id").isNotEmpty());

    }

    @DirtiesContext
    @Test
    void putChickenTest_shouldReturnUpdatedChicken_whenUpdatedChickenSent() throws Exception {

        // GIVEN
        LocalDate date = LocalDate.of(2024, 2, 12);

        chickensRepo.save(
                new Chicken("1","ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date));

        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/chickens/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                              
                                     {
                                        "id":"1",
                                        "race": "ross303",
                                        "weightInFirstDay": 0.6,
                                        "expectedSlaughterWeight": 2.6,
                                        "expectedSlaughterAge": 39,
                                        "feedConversion": 1.5,
                                        "hatchery": "kwh",
                                        "hatchDay": "2024-02-11"    
                                     }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                       {
                                          "id":"1",
                                          "race": "ross303",
                                          "weightInFirstDay": 0.6,
                                          "expectedSlaughterWeight": 2.6,
                                          "expectedSlaughterAge": 39,
                                          "feedConversion": 1.5,
                                          "hatchery": "kwh",
                                          "hatchDay": "2024-02-11"   
                                       }

                        """))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getChickenByNoExistingIdTest_shouldReturnNoObject() throws Exception {

        LocalDate date = LocalDate.of(2024, 2, 12);

        //GIVEN
        chickensRepo.save(
                new Chicken("1","ross308", 0.4, 2.8, 40, 1.6,
                        "kwh", date));

        String nonExisting ="nonExistingId";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/chickens/{id}", nonExisting))

                // THEN
                .andExpect(status().isNotFound())
                .andReturn();
        Assertions.assertEquals(404, mvcResult.getResponse().getStatus());

    }

    @DirtiesContext
    @Test
    void deleteChicken_shouldReturnChicken_whenThisObjectWasDeletedFromRepository() throws Exception{

        // GIVEN
        LocalDate date = LocalDate.of(2024, 2, 12);

        chickensRepo.save(
                new Chicken("1", "ross308", 0.4, 2.8, 40,
                        1.6, "kwh", date));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/chickens/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                      {
                                           "id": "1",
                                           "race": "ross308",
                                           "weightInFirstDay": 0.4,
                                           "expectedSlaughterWeight": 2.8,
                                           "expectedSlaughterAge": 40,
                                           "feedConversion": 1.6,
                                           "hatchery": "kwh",
                                           "hatchDay": "2024-02-12"
                                      }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


}


