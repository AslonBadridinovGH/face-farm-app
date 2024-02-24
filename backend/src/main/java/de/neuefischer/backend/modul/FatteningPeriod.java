package de.neuefischer.backend.modul;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;
import java.util.List;


public record FatteningPeriod(

        @Id
        String id,
        List <Chicken> chickens,
        LocalDate startDate,
        LocalDate currentDate,
        Long currentOld,
        String currentFeedingPhase,
        Integer lostToDay,
        Integer totalLost,
        LocalDate dateOfSlaughter

) {

}
