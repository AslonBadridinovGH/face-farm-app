package de.neuefischer.backend.modul;

import java.util.List;

public record UserDataType(

    String id,
    List <Integer> labels,
    List <Dataset> datasets

) {}
