
import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {FatPeriod} from "../../types/FatteningPeriod.tsx";
import {FatPeriodDto} from "../../types/FatteningPeriodDto.tsx";


type editFatteningPeriod = {
    fatteningPeriods: FatPeriod [],
    editFatPeriod: (periodDto: FatPeriodDto) => void
}

export default function EditFatteningPeriod(props : editFatteningPeriod) {

    const {id} = useParams();

     const period : FatPeriod | undefined = props.fatteningPeriods.find(period => period.id === id);

    const [chickenIds, setChickenIds]=useState<string[]>(period?.chickens?.map(value => value.id)||[])
    const [startDate, setStartDate] = useState<string>(period?.startDate || "")
    const [lostToday, setLostToday]=useState<number>(period?.lostToDay||0)
    const [dateOfSlaughter, setDateOfSlaughter]=useState<string>(period?.dateOfSlaughter||"")


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

        const fatPeriodDto : FatPeriodDto = {

            id : period?.id || "",
            chickenIDs : chickenIds,
            startDate: startDate,
            lostToDay : lostToday,
            dateOfSlaughter: dateOfSlaughter,
        }
        props.editFatPeriod(fatPeriodDto)
    }

    return (

        <StyledDiv>

            <StyledDivAddFarm>Edit Fattening Period</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>ChickenIds</label>
                    <input value={chickenIds.join(",")} onChange={onChickensIdsChange}/>
                </LabelInput>

                <LabelInput>
                    <label>lost chickens today</label>
                    <StyledInput value={lostToday} type={"number"} onChange={onLostToDayChange}
                                 placeholder={"lost Today"}/>
                </LabelInput>

                <LabelInput>
                    <label>start date</label>
                    <StyledInput value={startDate} type={"date"} onChange={onStartDateChange}
                                 placeholder={"start date"}/>
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