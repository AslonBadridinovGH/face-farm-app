package de.neuefischer.backend.modul;

public record Farm (
  String name, String activity, String address,
  Double area, Integer constructionYear, Integer amountAnimals,
  Integer chickenBarns, Integer silos, Integer techniques, Integer employees) {
}
