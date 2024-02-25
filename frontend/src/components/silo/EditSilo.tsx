import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Silo} from "../../types/Silo.tsx";
import {SiloDto} from "../../types/SiloDto.tsx";

type editSilo = {
    silos: Silo[],
    editSilo: (silo: SiloDto) => void
}

function EditSilo(props : editSilo) {

    const {id} = useParams();

     const silo : Silo | undefined = props.silos.find(silo => silo.id === id);

    const [numberOfSilo, setNumberSilo]=useState<number>(silo?.numberOfSilo || 0)
    const [capacity, setCapacity]=useState<number>( silo?.capacity || 0)
    const [amountOfFeed, setAmountOfFeed]=useState<number>( silo?.amountOfFeed || 0)
    const [feedIds, setFeedIds]=useState<string[]>(silo?.feeds?.map(value => value.id) || [])


    const onNumberSiloChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        setAmountOfFeed(event.target.valueAsNumber)
    }


    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const siloToSave: SiloDto = {
            id : silo?.id || "",
            numberOfSilo :numberOfSilo,
            capacity:capacity,
            amountOfFeed:amountOfFeed,
            feedIds: feedIds
        }
        props.editSilo(siloToSave)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Edit Silo Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>Number of Silo</label>
                    <StyledInput value={numberOfSilo} type={"number"} onChange={onNumberSiloChange}
                                 placeholder={"area"}/>
                </LabelInput>

                <LabelInput>
                    <label>Capacity</label>
                    <StyledInput value={capacity} type={"number"} onChange={onCapacityChange}
                                 placeholder={"number of animals"}/>
                </LabelInput>

                <LabelInput>
                    <label>Amount of Feed</label>
                    <StyledInput value={amountOfFeed} type={"number"} onChange={onAmountFeedChange}
                                 placeholder={"amount of Feed"}/>
                </LabelInput>

                <LabelInput>
                    <label>Feeds ID s</label>
                    <StyledInput value={feedIds} type={"string"} onChange={onCurrentFeedChange}
                                 placeholder={"feeds IDs"}/>
                </LabelInput>
                <button type={"submit"}>Submit</button>
            </StyledFormAdd>

        </StyledDiv>
    );
}

export default EditSilo;


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
