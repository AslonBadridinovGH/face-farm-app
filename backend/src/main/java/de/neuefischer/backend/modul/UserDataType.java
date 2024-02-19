package de.neuefischer.backend.modul;

import java.util.List;

public record UserDataType(

    List <Integer> labels,
    List <Dataset> datasets

) {}
