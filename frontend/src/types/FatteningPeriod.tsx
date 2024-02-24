import {Chicken} from "./Chicken.tsx";

export type FatPeriod = {

    id: string,
    chickens ?: Chicken[],
    startDate: string,
    currentDate: string,
    currentOld: number,
    currentFeedingPhase: string,
    lostToDay: number,
    totalLost: number,
    dateOfSlaughter: string,

 }
