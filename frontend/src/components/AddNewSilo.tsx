import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {SiloDto} from "../types/SiloDto.tsx";

type adSiloPops ={
    saveSilo : (siloToSave : SiloDto)=>void;
}

export default function AddNewSilo(props: adSiloPops) {

    const [numberOfSilo, setNumberSilo]=useState<number>(0)
    const [capacity, setCapacity]=useState<number>(0)
    const [feedIds, setFeedIds]=useState<string[]>([])
    const [amountFeed, setAmountFeed]=useState<number>(0)


    const onNumberOfSiloChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumberSilo(event.target.valueAsNumber)
    }
    const onCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCapacity(event.target.valueAsNumber)
    }
    const onCurrentFeedChange= (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.includes(",")){
            setFeedIds(event.target.value.split(","))
        }else {
            setFeedIds([event.target.value])
        }
    }

    const onAmountFeedChange= (event: ChangeEvent<HTMLInputElement>) => {
        setAmountFeed(event.target.valueAsNumber)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const siloToSave :SiloDto ={

            id: "1",
            numberOfSilo : numberOfSilo,
            capacity : capacity,
            amountOfFeed : amountFeed,
            feedIds : feedIds
        }
        props.saveSilo(siloToSave);
    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add New Silo</StyledDivAddFarm>

            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>Number of Silo</label>
                <SInput value={numberOfSilo} type={"number"} onChange={onNumberOfSiloChange} placeholder={"area"}/>

                <label>Capacity of Silo</label>
                <SInput value={capacity} type={"number"} onChange={onCapacityChange}
                        placeholder={"capacity of silo"}/>

                <label>Amount of Current Feed</label>
                <SInput value={amountFeed} type={"number"} onChange={onAmountFeedChange}
                        placeholder={"Amount of Feed"}/>

                <label>ID of Current Feed</label>
                <SInput value={feedIds} type={"string"} onChange={onCurrentFeedChange}
                        placeholder={"Name of Current Feed"}/>

                <button type={"submit"}>Submit</button>

            </StyledFormAdd>

        </StyledDiv>
    );
}


const StyledDivAddFarm = styled.div`
    background-color: red;
    text-align: center;
    padding: 20px 500px 20px 0;
`;

const StyledDiv = styled.div`
    display: flex;
    padding: 1vw;
    flex-direction: column;
`;

const StyledFormAdd = styled.form`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: initial;
    width:60%;
`;

const SInput =styled.input`
    margin: 0.5vw 0 0.5vw 0;
`;