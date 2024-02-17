package de.neuefischer.backend.dto;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.Objects;

@With
public record FarmDto(

        String name,
        String activity,
        String address,
        String area,
        Integer constructionYear

)  {}
