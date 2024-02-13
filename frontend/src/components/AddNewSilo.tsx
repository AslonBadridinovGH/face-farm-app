import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";


export default function AddNewSilo() {

    const [numberSilo, setNumberSilo]=useState<number>(0)
    const [capacity, setCapacity]=useState<number>(0)
    const [currentFeed, setCurrentFeed]=useState<string>("")
    const [amountFeed, setAmountFeed]=useState<number>(0)


    const onNumberOfSiloChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumberSilo(event.target.valueAsNumber)
    }
    const onCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCapacity(event.target.valueAsNumber)
    }
    const onCurrentFeedChange= (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentFeed(event.target.value)
    }
    const onAmountFeedChange= (event: ChangeEvent<HTMLInputElement>) => {
        setAmountFeed(event.target.valueAsNumber)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add New Silo</StyledDivAddFarm>

            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>Number of Silo</label>
                <SInput value={numberSilo} type={"number"} onChange={onNumberOfSiloChange} placeholder={"area"}/>

                <label>Capacity of Silo</label>
                <SInput value={capacity} type={"number"} onChange={onCapacityChange}
                        placeholder={"capacity of silo"}/>

                <label>Amount of Current Feed</label>
                <SInput value={amountFeed} type={"number"} onChange={onAmountFeedChange}
                        placeholder={"Amount of Feed"}/>

                <label>Name of Current Feed</label>
                <SInput value={currentFeed} type={"string"} onChange={onCurrentFeedChange}
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