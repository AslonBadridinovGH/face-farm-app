package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Chicken;
import de.neuefischer.backend.modul.ChickenBarn;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.ChickenBarnsRepo;
import de.neuefischer.backend.repository.ChickensRepo;
import de.neuefischer.backend.repository.FeedsRepo;
import de.neuefischer.backend.repository.SilosRepo;
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
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ChickenBarnContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ChickenBarnsRepo chickenBarnsRepo;

    @Autowired
    private ChickensRepo chickensRepo;

    @Autowired
    private SilosRepo silosRepo;

    @Autowired
    private FeedsRepo feedsRepo;

    @DirtiesContext
    @Test
    void getChickenBarnsTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

        ChickenBarn chickenBarn = new ChickenBarn("1", 10.4, "stall1", new ArrayList<Chicken>(), 40, 40,
                new ArrayList<Silo>());

        chickenBarnsRepo.save(chickenBarn);

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/chickenBarns"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [
                           
                           {
                                   "id": "1",
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickens": [],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silos": []
                           }
                        ]
                        
                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getChickenBarnByIdTest_shouldReturnObjectWithTheId() throws Exception {

        ChickenBarn chickenBarn = chickenBarnsRepo.save(
                new ChickenBarn("1", 10.4, "stall1", new ArrayList<Chicken>(), 40, 40,
                        new ArrayList<Silo>()));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/chickenBarns/{id}", chickenBarn.id()))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                            {
                                   "id": "1",
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickens": [],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silos": []
                           }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void addChickenBarnTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {

        Feed feed = new Feed("1", "2220", "starter", "desc", 0.5);
        feedsRepo.save(feed);

        LocalDate date = LocalDate.of(2024, 2, 12);
        chickensRepo.save(new Chicken("c1","ross308", 0.4, 2.8, 40, 1.6,
                        "kwh", date));
        silosRepo.save(new Silo("s1", 1, 10, 3.5, new ArrayList<Feed>(List.of(feed))));


        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/chickenBarns")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickensIds" : ["c1"],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silosIds": ["s1"]
                            }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""

                            {
                                    "area": 10.4,
                                    "name": "stall1",
                                    "chickens": [
                                                                   {       "id":"c1",
                                                                           "race": "ross308",
                                                                           "weightInFirstDay": 0.4,
                                                                           "expectedSlaughterWeight": 2.8,
                                                                           "expectedSlaughterAge": 40,
                                                                           "feedConversion": 1.6,
                                                                           "hatchery": "kwh",
                                                                           "hatchDay" : "2024-02-12"
                                                                           
                                                                   }],
                                    "amountOfChickens": 40,
                                    "capacityForChickens": 40,
                                    "silos": [
                                                {
                                                                  "id": "s1",
                                                                   "numberOfSilo": 1,
                                                                   "capacity": 10,
                                                                   "amountOfFeed":3.5,
                                                                   "feeds": [
                                                                  {
                                                                     "id": "1",
                                                                     "articleNumber": "2220",
                                                                     "type": "starter",
                                                                     "description": "desc",
                                                                     "pricePerTone": 0.5
                                                                   }
                                                                 ]                    
                                                               }
                                             ]
                            }
"""))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @DirtiesContext
    @Test
    void putChickenBarnTest_shouldReturnUpdatedChickenBarn_whenUpdatedChickenBarnSent() throws Exception {

        chickenBarnsRepo.save(
                 new ChickenBarn("1", 10.4, "stall1", new ArrayList<Chicken>(), 40, 40,
                         new ArrayList<Silo>()));

        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/chickenBarns/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""                                              
                            {      
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickensIds": [],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silosIds": []
                           }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {          "id": "1",
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickens": [],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silos": []
                           }

                        """))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getChickenBarnByNoExistingIdTest_shouldReturnNoObject() throws Exception {

        chickenBarnsRepo.save(new ChickenBarn("1", 10.4, "stall1", new ArrayList<Chicken>(), 40, 40,
                        new ArrayList<Silo>()));

        String nonExisting ="nonExistingId";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/chickenBarns/{id}", nonExisting))

                 // THEN
                .andExpect(status().isNotFound())
                .andReturn();
        Assertions.assertEquals(404, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void deleteChickenBarn_shouldReturnChickenBarn_whenThisObjectWasDeletedFromRepository() throws Exception{

         // GIVEN
        chickenBarnsRepo.save(new ChickenBarn("1", 10.4, "stall1", new ArrayList<Chicken>(), 40, 40,
                new ArrayList<Silo>()));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/chickenBarns/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                            {      "id": "1",
                                   "area": 10.4,
                                   "name": "stall1",
                                   "chickens": [],
                                   "amountOfChickens": 40,
                                   "capacityForChickens": 40,
                                   "silos": []
                           }
                        """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

}


