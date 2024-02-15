import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Feed} from "../../types/Feed.tsx";

type adFeedPops ={
    saveFeed  : (feedToSave : Feed)=>void;
}

export default function AddNewFeed(props: adFeedPops) {

    const [articleNumber, setArticleNumber]=useState<string>("")
    const [type, setType]=useState<string>("")
    const [description, setDescriptions]=useState<string>("")
    const [pricePerTone, setPricePerTone]=useState<string>("")


    const onArticleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticleNumber(event.target.value)
    }
    const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value)
    }

    const onDescriptionChange= (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptions(event.target.value)
    }

    const onPricePerToneChange= (event: ChangeEvent<HTMLInputElement>) => {
        setPricePerTone(event.target.value)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const feedToSave :Feed ={

            id: "1",
            articleNumber,
            type,
            description ,
            pricePerTone,
        }
        props.saveFeed(feedToSave);
    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Add New Feed</StyledDivAddFarm>

            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>article number</label>
                <SInput value={articleNumber} type={"string"} onChange={onArticleNumberChange} placeholder={"area"}/>

                <label>type of feed</label>
                <SInput value={type} type={"string"} onChange={onTypeChange}
                        placeholder={"capacity of silo"}/>

                <label>description of feed</label>
                <SInput value={description} type={"string"} onChange={onDescriptionChange}
                        placeholder={"description of feed"}/>

                <label>price per tone</label>
                <SInput value={pricePerTone} type={"string"} onChange={onPricePerToneChange}
                        placeholder={"price per tone"}/>

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
    align-items: initial;
    width:60%;
`;

const SInput =styled.input`
    margin: 0.5vw 0 0.5vw 0;
`;