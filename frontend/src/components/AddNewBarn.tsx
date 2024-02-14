import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {ChBarnDto} from "../types/ChickenBarnDto.tsx";

type addBarnProps = {
    saveBarn: (chickenBarnToSave : ChBarnDto) => void
}

export default function AddNewBarn(props : addBarnProps) {

    const [area, setArea] = useState<number>(0)
    const [amountOfAnimal, setAmountOfAnimal]=useState<number>(0)
    const [numberOfBarn, setNumberOfBarn]=useState<string>("")
    const [capacityOfBarn, setCapacityOfBarn]=useState<number>(0)
    const [chickenIds, setChickenIds]=useState<string[]>([])
    const [silos, setSilos]=useState<string[]>([])


    const onAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.valueAsNumber)
    }
    const onAmountOfAnimalsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmountOfAnimal(event.target.valueAsNumber)
    }
    const onNumberOfBarnChange= (event: ChangeEvent<HTMLInputElement>) => {
        setNumberOfBarn(event.target.value)
    }
    const onCapacityOfBarnsChange= (event: ChangeEvent<HTMLInputElement>) => {
        setCapacityOfBarn(event.target.valueAsNumber)
    }

    const onSilosOfBarnsChange= (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.includes(",")){
            setSilos(event.target.value.split(","))
        }else {
            setSilos([event.target.value])
        }
    }

    const onChickensIdsChange = (event:ChangeEvent<HTMLInputElement>)=>{
      if(event.target.value.includes(",")){
          setChickenIds( event.target.value.split(","))
      }else {
          setChickenIds([event.target.value])
      }
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const chBarnToSave: ChBarnDto = {

            id: "1",
            area: area,
            name: numberOfBarn,
            chickensIds : chickenIds,
            amountOfChickens: amountOfAnimal,
            capacityForChickens:capacityOfBarn,
            silosIds: silos
        }
        props.saveBarn(chBarnToSave)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add New Barn</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>Number of barn</label>
                    <StyledInput value={numberOfBarn} type={"string"} onChange={onNumberOfBarnChange}
                                 placeholder={"number of barns"}/>
                </LabelInput>

                <LabelInput>
                    <label>Area in Hectare</label>
                    <StyledInput value={area} type={"number"} onChange={onAreaChange} placeholder={"area"}/>
                </LabelInput>

                <LabelInput>
                    <label>Amount of chickens</label>
                    <StyledInput value={amountOfAnimal} type={"number"} onChange={onAmountOfAnimalsChange}
                                 placeholder={"number of animals"}/>
                </LabelInput>

                <LabelInput>
                    <label>Capacity of barn</label>
                    <StyledInput value={capacityOfBarn} type={"number"} onChange={onCapacityOfBarnsChange}
                                 placeholder={"capacity of barn"}/>
                </LabelInput>

                <LabelInput>
                    <label>ChickenIds</label>
                    <input value={chickenIds.join(",")} onChange={onChickensIdsChange}/>
                </LabelInput>

                <LabelInput>
                    <label>Number of silos</label>
                    <input value={silos.join(",")} onChange={onSilosOfBarnsChange}/>
                </LabelInput>
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
    gap: 15px;
    align-items: initial;
    width:60%;
`;
const LabelInput = styled.div`
     display: flex;
     flex-direction: column;
`;

const StyledInput =styled.input`
    margin: 0.5vw 0 0.5vw 0;
`;