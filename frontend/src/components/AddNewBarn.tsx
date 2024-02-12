import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {ChBarn} from "../types/ChickenBarn.tsx";

type addBarnProps = {
    saveBarn: (characterToSave: ChBarn) => void
}


export default function AddNewBarn(props : addBarnProps) {

    const [area, setArea] = useState<number>(0)
    const [amount_of_animal, setAmount_of_animal]=useState<number>(0)
    const [number_of_barn, setNumber_of_barn]=useState<number>(0)
    const [capacity_of_barn, setCapacity_of_barn]=useState<number>(0)
    const [silos, setSilos]=useState<string[]>([])


    const onAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.valueAsNumber)
    }
    const onAmount_of_animalsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount_of_animal(event.target.valueAsNumber)
    }
    const onNumber_of_barnChange= (event: ChangeEvent<HTMLInputElement>) => {
        setNumber_of_barn(event.target.valueAsNumber)
    }
    const onCapacity_of_barnsChange= (event: ChangeEvent<HTMLInputElement>) => {
        setCapacity_of_barn(event.target.valueAsNumber)
    }

    const onSilos_of_barnsChange= (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value.split(",")
        )
        if (event.target.value.includes(",")){
            setSilos(event.target.value.split(","))
        }else {
            setSilos([event.target.value])
        }

    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const chBarnToSave: ChBarn = {

            id: "1",
            area: area,
            amount_of_animals: amount_of_animal,
            number_of_barn: number_of_barn,
            capacity_of_barn:capacity_of_barn,
            chicken : "chicken",
            silos: silos
        }

        props.saveBarn(chBarnToSave)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add Farm Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>Area in Hectare</label>
                <SInput value={area} type={"number"} onChange={onAreaChange} placeholder={"area"}/>

                <label>Number of animals</label>
                <SInput value={amount_of_animal} type={"number"} onChange={onAmount_of_animalsChange}
                        placeholder={"number of animals"}/>

                <label>Number of barns</label>
                <SInput value={number_of_barn} type={"number"} onChange={onNumber_of_barnChange}
                        placeholder={"number of barns"}/>

                <label>Capacity of barn</label>
                <SInput value={capacity_of_barn} type={"number"} onChange={onCapacity_of_barnsChange}
                        placeholder={"capacity of barn"}/>

                <label>Number of silos</label>
                <input value={silos.join(",")} onChange={onSilos_of_barnsChange}/>

                <button type={"submit"}>Submit</button>

            </StyledFormAdd>

        </StyledDiv>
    );
}


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