package de.neuefischer.backend.modul;

import java.util.List;

public record Consume(

    String id,
    List <String> labels,
    List <ConsumeDataset> datasets

) {}
