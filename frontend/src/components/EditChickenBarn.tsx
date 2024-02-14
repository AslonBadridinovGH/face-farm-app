import {ChBarn} from "../types/ChickenBarn.tsx";
import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {ChBarnDto} from "../types/ChickenBarnDto.tsx";


type editChickenBarn = {
    chickenBarns: ChBarn[],
    editBarn: (chBarn: ChBarnDto) => void
}
function EditChickenBarn(props : editChickenBarn) {

    const {id} = useParams();

     const cBarn : ChBarn | undefined = props.chickenBarns.find(barn => barn.id === id);

    const [area, setArea] = useState<number>(cBarn?.area || 0)
    const [amountOfAnimal, setAmountOfAnimal]=useState<number>(cBarn?.amountOfChickens || 0)
    const [numberOfBarn, setNumberOfBarn]=useState<string>(cBarn?.name || "")
    const [capacityOfBarn, setCapacityOfBarn]=useState<number>(cBarn?.capacityForChickens || 0)
    const [silosIds, setSilosIds]=useState<string[]>( [])

   /* const [silos, setSilos]=useState<Silo[]>(cBarn?.silos || [])
    const [chickens, setChickens]=useState<Chicken[]>(cBarn?.chickens|| [])*/

    const [chickenIds, setChickenIds]=useState<string[]>([])


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

    const onChickensIdsChange = (event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.includes(",")){
          setChickenIds( event.target.value.split(","))
         // setChickens(chickens)
         // chickens.map(value => chickenIds.map(value1 => {value.id=value1}))
        }else {
           setChickenIds([event.target.value])
        }
    }

    const onSilosOfBarnsChange= (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.includes(",")){
            setSilosIds(event.target.value.split(","))
           // setSilos(event.target.value.split(","))
        }else {
             setSilosIds([event.target.value])
          //  setSilos([event.target.value])
        }
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const chBarnToSave: ChBarnDto = {
            id: cBarn?.id || "",
            area: area,
            name: numberOfBarn,
            amountOfChickens: amountOfAnimal,
            chickensIds : chickenIds,
            capacityForChickens:capacityOfBarn,
            silosIds: silosIds
        }
        props.editBarn(chBarnToSave)
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
                    <label>Capacity of barn</label>
                    <StyledInput value={capacityOfBarn} type={"number"} onChange={onCapacityOfBarnsChange}
                                 placeholder={"capacity of barn"}/>
                </LabelInput>

                <LabelInput>
                    <label>Amount of chickens</label>
                    <StyledInput value={amountOfAnimal} type={"number"} onChange={onAmountOfAnimalsChange}
                                 placeholder={"number of animals"}/>
                </LabelInput>

                <LabelInput>
                    <label>ChickenIds</label>
                    <input value={chickenIds.join(",")} onChange={onChickensIdsChange}/>
                </LabelInput>

                <LabelInput>
                    <label>Number of silos</label>
                    <input value={silosIds.join(",")} onChange={onSilosOfBarnsChange}/>
                </LabelInput>
                <button type={"submit"}>Submit</button>
            </StyledFormAdd>

        </StyledDiv>
    );
}

export default EditChickenBarn;
/*  <StyledDiv>

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
        <button onClick={redirect}>List Chicken Barns</button>

    </StyledFormAdd>

</StyledDiv>*/

/*
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
*/

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