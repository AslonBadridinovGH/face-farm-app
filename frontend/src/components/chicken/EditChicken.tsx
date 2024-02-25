import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Chicken} from "../../types/Chicken.tsx";


type editChicken = {
    chickens : Chicken[],
    editChicken : (chicken : Chicken) => void
}

function EditChickenBarn(props : editChicken) {

    const {id} = useParams();

     const chicken: Chicken | undefined = props.chickens.find(chicken => chicken.id === id);

    const [race, setRace] = useState<string>(chicken?.race ||"")
    const [weightInFirstDay, setWeightInFirstDay]=useState<number>(chicken?.weightInFirstDay || 0)
    const [expectedSlaughterWeight, setExpectedSlaughterWeight]=useState<number>(chicken?.expectedSlaughterWeight || 0)
    const [expectedSlaughterAge, setExpectedSlaughterAge]=useState<number>(chicken?.expectedSlaughterAge ||0)
    const [feedConversion, setFeedConversion]=useState<string>(chicken?.feedConversion || "")
    const [hatchery, setHatchery]=useState<string>(chicken?.hatchery ||"")
    const [hatchDay, setHatchDay]=useState<string>(chicken?.hatchDay || "")


    const onRaceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRace(event.target.value)
    }
    const onWeightInFirstDayChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWeightInFirstDay(event.target.valueAsNumber)
    }

    const onExpectedSlaughterWeightChange= (event: ChangeEvent<HTMLInputElement>) => {
        setExpectedSlaughterWeight(event.target.valueAsNumber)
    }

    const onExpectedSlaughterAgeChange= (event: ChangeEvent<HTMLInputElement>) => {
        setExpectedSlaughterAge(event.target.valueAsNumber)
    }

    const onFeedConversion= (event: ChangeEvent<HTMLInputElement>) => {
        setFeedConversion(event.target.value)
    }
    const onHatcheryChange= (event: ChangeEvent<HTMLInputElement>) => {
        setHatchery(event.target.value)
    }

    const onHatchDayChange= (event: ChangeEvent<HTMLInputElement>) => {
        setHatchDay(event.target.value)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const chickenToSave: Chicken = {

            id: chicken?.id || "",
            race,
            weightInFirstDay,
            expectedSlaughterWeight,
            expectedSlaughterAge,
            feedConversion,
            hatchery,
            hatchDay
        }
        props.editChicken(chickenToSave)
    }

    return (

        <StyledDiv>

            <StyledDivAddFarm>Change Chicken Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>race of chicken</label>
                    <StyledInput value={race} type={"string"} onChange={onRaceChange}
                                 placeholder={"race of chicken"}/>
                </LabelInput>

                <LabelInput>
                    <label>weight in first day in gram</label>
                    <StyledInput value={weightInFirstDay} type={"number"} onChange={onWeightInFirstDayChange}
                                 placeholder={"weight in first day"}/>
                </LabelInput>

                <LabelInput>
                    <label>expected slaughter weight in gram</label>
                    <StyledInput value={expectedSlaughterWeight} type={"number"} onChange={onExpectedSlaughterWeightChange}
                                 placeholder={"expected slaughter weight"}/>
                </LabelInput>

                <LabelInput>
                    <label>expected slaughter age </label>
                    <StyledInput value={expectedSlaughterAge} type={"number"} onChange={onExpectedSlaughterAgeChange}
                                 placeholder={"expected slaughter age"}/>
                </LabelInput>

                <LabelInput>
                    <label>feed conversion</label>
                    <StyledInput value={feedConversion} type={"string"} onChange={onFeedConversion}
                                 placeholder={"feed conversion"}/>
                </LabelInput>

                <LabelInput>
                    <label>hatch day</label>
                    <StyledInput value={hatchDay} type={"date"} onChange={onHatchDayChange}
                                 placeholder={"hatch day"}/>
                </LabelInput>

                <LabelInput>
                    <label>hatchery</label>
                    <StyledInput value={hatchery} type={"string"} onChange={onHatcheryChange}
                                 placeholder={"hatchery"}/>
                </LabelInput>

                <button type={"submit"}>Submit</button>
            </StyledFormAdd>

        </StyledDiv>
    );
}

export default EditChickenBarn;


const StyledDiv = styled.div`
    display: flex;
    padding: 1vw 0 0 3vw;
    flex-direction: column;
    gap: 1rem;
`;

const StyledDivAddFarm = styled.div`
 
    text-align: center;
    padding: 10px 300px 10px 0;
    font-size: 2vw;
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