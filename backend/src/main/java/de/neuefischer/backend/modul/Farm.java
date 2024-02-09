package de.neuefischer.backend.modul;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record Farm (
        @Id
        String id,
        String name,
        String activity,
        String address,
        Double area,
        Integer constructionYear,
        Integer amountAnimals,

        List <ChickenBarn> chickenBarns,
        List <Silo> silos,
        List <Integer> techniques,
        List <Integer> employees) {}
