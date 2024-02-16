package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Farm;
import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
import de.neuefischer.backend.repository.FarmsRepo;
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

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FarmContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FarmsRepo farmsRepo;

    @DirtiesContext
    @Test
    void getFarmsTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

        farmsRepo.save(
              new Farm("1","barnstorf", "broiler", "landstrasse", 20.5, 1996, 2000));

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/farm"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [
                                
                           {
                                   "id": "1",
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996,
                                   "amountAnimals": 2000
                           }
                        ]
                         
                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }



    @DirtiesContext
    @Test
    void addFarmTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {

        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/farm")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {                            
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996
                           }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""

{          
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996,
                                   "amountAnimals": 0
                           }
"""))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }


    @DirtiesContext
    @Test
    void putFarmTest_shouldReturnUpdatedFarm_whenUpdatedFarmSent() throws Exception {

        // GIVEN

        farmsRepo.save(
         new Farm("1","barnstorf", "broiler", "landstrasse", 20.5, 1996, 2000));

        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/farm/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                              
                                  {     
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996
                           }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {     
                                   "id":"1",                           
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996,
                                   "amountAnimals": 0
                           }
                        """))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void deleteFarm_shouldReturnFarm_whenThisObjectWasDeletedFromRepository() throws Exception{

        // GIVEN
        farmsRepo.save(
                new Farm("1","barnstorf", "broiler", "landstrasse", 20.5, 1996, 2000));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/farm/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                         {     
                                                  
                                   "name": "barnstorf",
                                   "activity": "broiler",
                                   "address": "landstrasse",
                                   "area": 20.5,
                                   "constructionYear": 1996,
                                   "amountAnimals": 2000
                         }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


}


