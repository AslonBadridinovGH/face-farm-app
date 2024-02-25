package de.neuefischer.backend.modul;
import lombok.With;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;
import java.util.List;

@With
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
