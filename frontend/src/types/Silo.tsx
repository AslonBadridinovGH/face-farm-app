import {Feed} from "./Feed.tsx";

export type Silo = {

     id : string,
     numberOfSilo : number,
     capacity : number,
     amountFeed : number,
     feeds : Feed[],
 }