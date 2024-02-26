import styled from "styled-components";
import {ChangeEvent, FormEvent, useState} from "react";
import {Farm} from "../../types/Farm.tsx";
import {useParams} from "react-router-dom";

type FarmInfoProps = {
    farms : Farm [],
    editeFarm : (farm : Farm) => void;
}


export default function EditFarmInfo(props: FarmInfoProps) {

    const {id} = useParams();

    const farm : Farm | undefined = props.farms.find(frm => frm.id===id);

    const [name, setName] = useState<string>(farm?.name || "")
    const [activity, setActivity] = useState<string>(farm?.activity || "")
    const [address, setAddress] = useState<string>(farm?.address || "")
    const [area, setArea] = useState<number>(farm?.area || 0)
    const [constructionYear, setConstructionYear]=useState<number>(farm?.constructionYear || 2024)


    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onActivityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setActivity(event.target.value)
    }
    const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }
    const onAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArea(event.target.valueAsNumber)
    }

    const onConstruction_yearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConstructionYear(event.target.valueAsNumber)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const farmToSave : Farm = {

            id:farm?.id||"",
            name : name,
            activity : activity,
            address : address,
            area : area,
            constructionYear : constructionYear,
            amountAnimals : 0
        }
        props.editeFarm(farmToSave)
    }


    return (
        <StyledDiv>

                      <StyledDivAddFarm>Change Farm Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>Name</label>
                    <StyledInput value={name} onChange={onNameChange} placeholder={"name"}/>
                </LabelInput>

                <LabelInput>
                    <label>Activity</label>
                    <StyledInput value={activity} onChange={onActivityChange} placeholder={"activity"}/>
                </LabelInput>

                <LabelInput>
                    <label>Address</label>
                    <StyledInput value={address} onChange={onAddressChange} placeholder={"address"}/>
                </LabelInput>

                <LabelInput>
                    <label>Area</label>
                    <StyledInput value={area} type={"number"} step={"0.5"}
                                 onChange={onAreaChange} placeholder={"area"}/>
                </LabelInput>

                <LabelInput>
                    <label>Construction year</label>
                    <StyledInput value={constructionYear} type={"number"} onChange={onConstruction_yearChange}
                                 placeholder={"construction year"}/>
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