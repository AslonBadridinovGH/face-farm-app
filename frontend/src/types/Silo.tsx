import {Feed} from "./Feed.tsx";

export type Silo = {

     id : string,
     numberOfSilo : number,
     capacity : number,
     amountOfFeed : number,
     feeds ? : Feed[],

 }