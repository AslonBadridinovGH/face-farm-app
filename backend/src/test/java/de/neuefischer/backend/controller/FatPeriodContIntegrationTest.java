package de.neuefischer.backend.controller;

import de.neuefischer.backend.modul.*;
import de.neuefischer.backend.repository.*;
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
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FatPeriodContIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FatteningPeriodsRepo fatteningPeriodsRepo;

    @Autowired
    private ChickensRepo chickensRepo;


    @DirtiesContext
    @Test
    void getFatPeriodTest_shouldReturnListWithOneObject_whenOneObjectWasSavedInRepository() throws Exception {

         FatteningPeriod fatteningPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2020,12,12),
                LocalDate.of(2020,12,10),
                12L,"starter", 12,
                12, LocalDate.of(2020,12,13));
        fatteningPeriodsRepo.save(fatteningPeriod);

        // WHEN
        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders.get("/api/fattening"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""

                        [

                           {
                                   "id" : "1",
                                   "chickens" : [],
                                   "startDate" : "2020-12-12",
                                   "currentDate" : "2020-12-10",
                                   "currentOld" : 12,
                                   "currentFeedingPhase" : "starter",
                                   "lostToDay" : 12,
                                   "totalLost" : 12,
                                   "dateOfSlaughter" : "2020-12-13"

                           }
                        ]

                        """));

        assertEquals(200, resultActions.andReturn().getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void getFatPeriodByIdTest_shouldReturnObjectWithTheId() throws Exception {

        FatteningPeriod fatteningPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2020,12,12),
                LocalDate.of(2020,12,10),
                12L,"starter", 12,
                12, LocalDate.of(2020,12,13));
        fatteningPeriodsRepo.save(fatteningPeriod);

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/fattening/{id}", fatteningPeriod.id()))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                            {
                                   "id" : "1",
                                   "chickens" : [],
                                   "startDate" : "2020-12-12",
                                   "currentDate" : "2020-12-10",
                                   "currentOld" : 12,
                                   "currentFeedingPhase" : "starter",
                                   "lostToDay" : 12,
                                   "totalLost" : 12,
                                   "dateOfSlaughter" : "2020-12-13"
                           }
                                """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void addFatteningPeriodTest_shouldReturnOneObject_whenObjectWasSavedInRepository() throws Exception {


        // GIVEN
        // WHEN
        mvc.perform(MockMvcRequestBuilders.post("/api/fattening")

                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                             {                                
                                     "chickenIDs" : [],
                                     "lostToDay" : 12, 
                                     "startDate" : "2024-02-20",                         
                                     "dateOfSlaughter" : "2020-12-13"
                             }
"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            
                            {                         
                                   "chickens" : [],
                                   "startDate" : "2024-02-20",
                                   "currentFeedingPhase" : "starter",
                                   "lostToDay" : 12,
                                   "totalLost" : 12,
                                   "dateOfSlaughter" : "2020-12-13"
                            }
                                                 
"""))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.currentOld").isNotEmpty())
                .andExpect(jsonPath("$.currentDate").isNotEmpty());
    }

    @DirtiesContext
    @Test
    void putFatteningPeriodTest_shouldReturnUpdatedChickenBarn_whenUpdatedFatteningPeriodSent() throws Exception {

        FatteningPeriod fatteningPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2024,2,20),
                LocalDate.now(),
                4L,"starter", 12,
                12, LocalDate.of(2024,12,13));
        fatteningPeriodsRepo.save(fatteningPeriod);

        long old = 0;
        old = Period.between(Objects.requireNonNull( LocalDate.of(2024,2,20)), LocalDate.now()).get(ChronoUnit.DAYS);

        // WHEN
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put("/api/fattening/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""                                              
                             {                               
                                     "chickenIDs" : [],
                                     "lostToDay" : 12, 
                                     "startDate" : "2024-02-20",                         
                                     "dateOfSlaughter" : "2024-02-20"
                                  
                             }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                       {                        
                                   "chickens" : [],
                                   "startDate" : "2024-02-20",
                                   "currentFeedingPhase" : "starter",
                                   "lostToDay" : 12,
                                   "totalLost" : 24,
                                   "dateOfSlaughter" : "2024-02-20"
                       }
                     
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.currentOld").isNotEmpty())
                .andExpect(jsonPath("$.currentDate").isNotEmpty())
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }


    @DirtiesContext
    @Test
    void getFatteningPeriodByNoExistingIdTest_shouldReturnNoObject() throws Exception {

        FatteningPeriod fatteningPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2024,2,20),
                LocalDate.of(2024,2,24),
                4L,"starter", 12,
                12, LocalDate.of(2024,12,13));

        fatteningPeriodsRepo.save(fatteningPeriod);

        String nonExisting ="nonExistingId";

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/fattening/{id}", nonExisting))

                 // THEN
                .andExpect(status().isNotFound())
                .andReturn();
        Assertions.assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @DirtiesContext
    @Test
    void deleteFatteningPeriod_shouldReturnFatteningPeriod_whenThisObjectWasDeletedFromRepository() throws Exception{

         // GIVEN
        FatteningPeriod fatteningPeriod = new FatteningPeriod(
                "1", new ArrayList<>(),
                LocalDate.of(2024,2,21),
                LocalDate.of(2024,2,24),
                4L,"starter", 12,
                12, LocalDate.of(2024,12,20));

        fatteningPeriodsRepo.save(fatteningPeriod);

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete("/api/fattening/1"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                     {           
                                   "id" : "1",           
                                   "chickens" : [],
                                   "startDate" : "2024-02-21",
                                   "currentDate" : "2024-02-24",
                                   "currentOld" : 4,
                                   "currentFeedingPhase" : "starter",
                                   "lostToDay" : 12,
                                   "totalLost" : 12,
                                   "dateOfSlaughter" : "2024-12-20"
                       }
                        """
                ))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

}


