import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {ChBarn} from "../types/ChickenBarn.tsx";

type addBarnProps = {
    saveBarn: (characterToSave: ChBarn) => void
}

export default function AddNewBarn(props : addBarnProps) {

    const [area, setArea] = useState<number>(0)
    const [amountOfAnimal, setAmountOfAnimal]=useState<number>(0)
    const [numberOfBarn, setNumberOfBarn]=useState<number>(0)
    const [capacityOfBarn, setCapacityOfBarn]=useState<number>(0)
    const [silos, setSilos]=useState<string[]>([])


    const onAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.valueAsNumber)
    }
    const onAmountOfAnimalsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmountOfAnimal(event.target.valueAsNumber)
    }
    const onNumberOfBarnChange= (event: ChangeEvent<HTMLInputElement>) => {
        setNumberOfBarn(event.target.valueAsNumber)
    }
    const onCapacityOfBarnsChange= (event: ChangeEvent<HTMLInputElement>) => {
        setCapacityOfBarn(event.target.valueAsNumber)
    }

    const onSilosOfBarnsChange= (event: ChangeEvent<HTMLInputElement>) => {
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
            amountOfAnimals: amountOfAnimal,
            numberOfBarn: numberOfBarn,
            capacityOfBarn:capacityOfBarn,
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
                <SInput value={amountOfAnimal} type={"number"} onChange={onAmountOfAnimalsChange}
                        placeholder={"number of animals"}/>

                <label>Number of barns</label>
                <SInput value={numberOfBarn} type={"number"} onChange={onNumberOfBarnChange}
                        placeholder={"number of barns"}/>

                <label>Capacity of barn</label>
                <SInput value={capacityOfBarn} type={"number"} onChange={onCapacityOfBarnsChange}
                        placeholder={"capacity of barn"}/>

                <label>Number of silos</label>
                <input value={silos.join(",")} onChange={onSilosOfBarnsChange}/>

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