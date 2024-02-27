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

                <LabelInput>
                    <label>Type of feed</label>
                    <StyledInput value={type} type={"string"} onChange={onTypeChange}
                                 placeholder={"type of feed"}/>
                </LabelInput>

                <LabelInput>
                    <label>Article number</label>
                    <StyledInput value={articleNumber} type={"string"} onChange={onArticleNumberChange}
                                 placeholder={"article number"}/>
                </LabelInput>

                <LabelInput>
                    <label>Description of feed</label>
                    <StyledInput value={description} type={"string"} onChange={onDescriptionChange}
                                 placeholder={"description of feed"}/>

                </LabelInput>

                <LabelInput>
                    <label>Price per tone in euro</label>
                    <StyledInput value={pricePerTone} type={"string"} onChange={onPricePerToneChange}
                                 placeholder={"price per tone"}/>
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