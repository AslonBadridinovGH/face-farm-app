package de.neuefischer.backend.modul;

import java.util.List;

public record WaterConsume(

    String id,
    List <String> labels,
    List <WaterDataset> datasets

) {}
