package de.neuefischer.backend.controller;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {

        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        Optional<Integer> reduce = numbers.stream().reduce(Integer::sum);
        Integer i = reduce.get();
        System.out.println(i);

        /*
        Integer amountChickens = 0;
        List<ChickenBarn> all = chickenBarnsRepo.findAll();
        for (ChickenBarn chickenBarn : all) {
            Integer amount = chickenBarn.amountOfChickens();
            amountChickens += amount;
        }
*/


    }
}
