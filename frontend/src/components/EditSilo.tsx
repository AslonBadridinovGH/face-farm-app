
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Silo} from "../types/Silo.tsx";

type editSilo = {
    silos: Silo[],
    editSilo: (silo: Silo) => void
}
function EditSilo(props : editSilo) {

    const {id} = useParams();

     const silo : Silo | undefined = props.silos.find(silo => silo.id === id);

    const [numberOfSilo, setNumberSilo]=useState<number>(silo?.numberOfSilo || 0)
    const [capacity, setCapacity]=useState<number>( silo?.capacity || 0)
    const [currentFeed, setCurrentFeed]=useState<string>(silo?.currentFeed || "")
    const [amountFeed, setAmountFeed]=useState<number>( silo?.amountFeed || 0)


    const onNumberSiloChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const navigate = useNavigate();

    const redirect = ()=>{
        navigate("/chickenBarns")
    }


    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const siloToSave: Silo = {

            id: silo?.id || "",
            numberOfSilo, capacity, currentFeed, amountFeed,
        }

        props.editSilo(siloToSave)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add Farm Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>Area in Hectare</label>
                <SInput value={numberOfSilo} type={"number"} onChange={onNumberSiloChange} placeholder={"area"}/>

                <label>Number of animals</label>
                <SInput value={capacity} type={"number"} onChange={onCapacityChange}
                        placeholder={"number of animals"}/>

                <label>Number of barns</label>
                <SInput value={currentFeed} type={"number"} onChange={onCurrentFeedChange}
                        placeholder={"number of barns"}/>

                <label>Capacity of barn</label>
                <SInput value={amountFeed} type={"number"} onChange={onAmountFeedChange}
                        placeholder={"capacity of barn"}/>

                <button type={"submit"}>Submit</button>
                <button onClick={redirect}>List Chicken Barns</button>

            </StyledFormAdd>

        </StyledDiv>
    );
}

export default EditSilo;

const StyledDivAddFarm= styled.div`
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