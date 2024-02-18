import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Chicken} from "../../types/Chicken.tsx";

type addChickenProps = {
    saveChicken: (chickenToSave : Chicken) => void
}


export default function AddNewChicken(props : addChickenProps) {

    const [race, setRace] = useState<string>("")
    const [weightInFirstDay, setWeightInFirstDay]=useState<number>(0)
    const [expectedSlaughterWeight, setExpectedSlaughterWeight]=useState<number>(0)
    const [expectedSlaughterAge, setExpectedSlaughterAge]=useState<number>(0)
    const [feedConversion, setFeedConversion]=useState<string>("")
    const [hatchery, setHatchery]=useState<string>("")
    const [hatchDay, setHatchDay]=useState<string>("")


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
        const chicken : Chicken = {
            id: "1",
            race,
            weightInFirstDay,
            expectedSlaughterWeight,
            expectedSlaughterAge,
            feedConversion,
            hatchery,
            hatchDay
        }
        props.saveChicken(chicken)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add New Chicken</StyledDivAddFarm>
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
                    <label>Expected slaughter weight in gram</label>
                    <StyledInput value={expectedSlaughterWeight} type={"number"} onChange={onExpectedSlaughterWeightChange}
                                 placeholder={"expected slaughter weight"}/>
                </LabelInput>

                <LabelInput>
                    <label>expected slaughter age</label>
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
                                 placeholder={"hatch day in form: dd.MM.yyyy"}/>
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