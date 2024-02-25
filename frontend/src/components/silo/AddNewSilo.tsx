import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {SiloDto} from "../../types/SiloDto.tsx";

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

                <LabelInput>
                    <label>Number of Silo</label>
                    <StyledInput value={numberOfSilo} type={"number"} onChange={onNumberOfSiloChange}
                                 placeholder={"area"}/>
                </LabelInput>

                <LabelInput>
                    <label>Capacity of Silo</label>
                    <StyledInput value={capacity} type={"number"} onChange={onCapacityChange}
                                 placeholder={"capacity of silo"}/>
                </LabelInput>

                <LabelInput>
                    <label>Amount of Current Feed</label>
                    <StyledInput value={amountFeed} type={"number"} onChange={onAmountFeedChange}
                                 placeholder={"Amount of Feed"}/>
                </LabelInput>

                <LabelInput>
                    <label>ID of Current Feed</label>
                    <StyledInput value={feedIds} type={"string"} onChange={onCurrentFeedChange}
                                 placeholder={"Name of Current Feed"}/>
                </LabelInput>

                <button type={"submit"}>Submit</button>

            </StyledFormAdd>

        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    display: flex;
    padding: 1vw 0 0 3vw;
    flex-direction: column;
    gap: 1rem;

`;

const StyledDivAddFarm = styled.div`
    text-align: center;
    padding: 10px 10px 10px 0;
    font-size: 2vw;
    width: 40vw;
`;

const StyledFormAdd = styled.form`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 15px;
    align-items: initial;
    width:60%;
`;

const LabelInput = styled.div`
     display: flex;
     flex-direction: column;
`;

const StyledInput =styled.input`
    margin: 0.5vw 0 ;
`;



