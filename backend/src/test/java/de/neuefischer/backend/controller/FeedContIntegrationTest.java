package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.Feed;
import de.neuefischer.backend.repository.FeedsRepo;
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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FeedContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FeedsRepo feedsRepo;

    @DirtiesContext
    @Test
    void getFeedsTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

        feedsRepo.save(
          new Feed("1","1020", "starter", "desc", 0.40));

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/feeds"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [
                                
                           {
                                   "id": "1",
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
                        ]
                         
                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getFeedByIdTest_shouldReturnObjectWithTheId() throws Exception {

        Feed feed = feedsRepo.save(
                new Feed("1", "1020", "starter", "desc", 0.40));

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/feeds/{id}", feed.id()))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                       {
                                   "id": "1",
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void addFeedTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {

        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/feeds")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {                            
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""

                           {                           
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
"""))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }


    @DirtiesContext
    @Test
    void putFeedTest_shouldReturnUpdatedFeed_whenUpdatedFeedSent() throws Exception {

        // GIVEN
         feedsRepo.save(
                new Feed("1", "1020", "starter", "desc", 0.40));


        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/feeds/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                              
                                {   
                                   "id":"1",                         
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                          {   
                                   "id":"1",                         
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }

                        """))
                .andReturn();
        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void getFeedByNoExistingIdTest_shouldReturnNoObject() throws Exception {

        //GIVEN
        String nonExisting ="nonExistingId";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/feeds/{id}", nonExisting))

                // THEN
                .andExpect(status().isNotFound())
                .andReturn();
        Assertions.assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void deleteFeed_shouldReturnFeed_whenThisObjectWasDeletedFromRepository() throws Exception{

        // GIVEN
        feedsRepo.save(
                new Feed("1", "1020", "starter", "desc", 0.40));


        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/feeds/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                           {
                                   "id":"1",                        
                                   "articleNumber": "1020",
                                   "type": "starter",
                                   "description": "desc",
                                   "pricePerTone": 0.40
                           }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


}


