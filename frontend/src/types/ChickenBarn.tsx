import {Chicken} from "./Chicken.tsx";
import {Silo} from "./Silo.tsx";

export type ChBarn = {

                   id : string,
                  area : number,
                  name : string,
              chickens ? : Chicken [],
       amountOfChickens : number,
     capacityForChickens : number,
              silos ? : Silo[]

 }
