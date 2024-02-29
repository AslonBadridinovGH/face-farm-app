package de.neuefischer.backend.modul;
import org.springframework.data.annotation.Id;


public record User(
        @Id
        String id,
        String name

) {}
