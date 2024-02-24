import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {FatPeriodDto} from "../../types/FatteningPeriodDto.tsx";

type addPeriodProps = {
    savePeriod: (fatPeriodDto : FatPeriodDto) => void
}

export default function AddFatteningPeriod(props : addPeriodProps) {

    const [chickenIds, setChickenIds]=useState<string[]>([])
    const [startDate, setStartDate] = useState<string>("")
    const [lostToday, setLostToday]=useState<number>(0)
    const [dateOfSlaughter, setDateOfSlaughter]=useState<string>("")


    const onChickensIdsChange = (event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.includes(",")){
            setChickenIds( event.target.value.split(","))
        }else {
            setChickenIds([event.target.value])
        }
    }

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value)
    }
    const onLostToDayChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLostToday(event.target.valueAsNumber)
    }

    const onDateOfSlaughterChange= (event: ChangeEvent<HTMLInputElement>) => {
        setDateOfSlaughter(event.target.value)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const fatPeriodDto: FatPeriodDto = {

            id: "1",
            chickenIDs: chickenIds,
            startDate: startDate,
            lostToday : lostToday,
            dateOfSlaughter: dateOfSlaughter,

        }
        props.savePeriod(fatPeriodDto)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add Fattening Period</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>chicken Ids</label>
                    <input value={chickenIds.join(",")} placeholder={"chicken Ids"} onChange={onChickensIdsChange}/>
                </LabelInput>

                <LabelInput>
                    <label>start date</label>
                    <StyledInput value={startDate} type={"date"} onChange={onStartDateChange}
                                 placeholder={"start date"}/>
                </LabelInput>

                <LabelInput>
                    <label>lost chicken today</label>
                    <StyledInput value={lostToday} type={"number"} onChange={onLostToDayChange}
                                 placeholder={"lost Today"}/>
                </LabelInput>

                <LabelInput>
                    <label>date of slaughter</label>
                    <StyledInput value={dateOfSlaughter} type={"date"} onChange={onDateOfSlaughterChange}
                                 placeholder={"Date Of Slaughter"}/>
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