package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.modul.Silo;
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
public class SiloContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private SilosRepo silosRepo;

    @DirtiesContext
    @Test
    void getSilosTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

        silosRepo.save(
          new Silo("1",1, 30, 15.5, new ArrayList<Feed>()));

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/silos"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [
                                
                           {
                                   "id": "1",
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feeds": []
                           }
                        ]
                         
                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getSiloByIdTest_shouldReturnObjectWithTheId() throws Exception {

        Silo silo =  silosRepo.save(
                new Silo("1",1, 30, 15.5, new ArrayList<Feed>()));

       MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/silos/{id}", silo.id()))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                       {
                                   "id": "1",
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feeds": []
                           }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }



    @DirtiesContext
    @Test
    void addSiloTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {

        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/silos")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {                                
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feedIds": []
                           }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""

                          {                                
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feeds": []
                           }
"""))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }



    @DirtiesContext
    @Test
    void putSiloTest_shouldReturnUpdatedSilo_whenUpdatedSiloSent() throws Exception {

        // GIVEN
        silosRepo.save(
                new Silo("1",1, 30, 15.5, new ArrayList<Feed>()));


        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/silos/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                              
                                  {     
                                                    
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feedIds": []
                           }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {     
                                   "id":"1",                           
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feeds": []
                           }
                        """))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
    }



    @DirtiesContext
    @Test
    void getSiloByNoExistingIdTest_shouldReturnNoObject() throws Exception {

        //GIVEN
        String nonExisting ="nonExistingId";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/silos/{id}", nonExisting))

                // THEN
                .andExpect(status().isNotFound())
                .andReturn();
        Assertions.assertEquals(404, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void deleteSilo_shouldReturnSilo_whenThisObjectWasDeletedFromRepository() throws Exception{

        // GIVEN
        silosRepo.save(
                new Silo("1",1, 30, 15.5, new ArrayList<Feed>()));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/silos/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                         {     
                                   "id":"1",                           
                                   "numberOfSilo": 1,
                                   "capacity": 30,
                                   "amountOfFeed": 15.5,
                                   "feeds": []
                         }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


}


