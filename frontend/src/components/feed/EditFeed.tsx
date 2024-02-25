import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import {Feed} from "../../types/Feed.tsx";

type editFeed = {
    feeds: Feed[],
    editFeed: (feed: Feed) => void
}

export default function EditFeed (props : editFeed) {

    const {id} = useParams();

    const feed : Feed | undefined = props.feeds.find(feed => feed.id === id);

    const [articleNumber, setArticleNumber] = useState<string>(feed?.articleNumber || "")
    const [type, setType] = useState<string>(feed?.type || "")
    const [description, setDescriptions] = useState<string>(feed?.description || "")
    const [pricePerTone, setPricePerTone] = useState<string>( feed?.pricePerTone || "")


    const onArticleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticleNumber(event.target.value)
    }
    const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value)
    }
    const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptions(event.target.value)
    }
    const onPricePerToneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPricePerTone(event.target.value)
    }

    const onFarmSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const feedToSave: Feed = {
            id : feed?.id || "",
            articleNumber,
            type,
            description ,
            pricePerTone,
        }

        props.editFeed(feedToSave)

    }

    return (
        <StyledDiv>

            <StyledDivAddFarm>Edit Feed Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <LabelInput>
                    <label>type of feed</label>
                    <StyledInput value={type} type={"string"} onChange={onTypeChange}
                                 placeholder={"type of feed"}/>
                </LabelInput>

                <LabelInput>
                    <label>article number</label>
                    <StyledInput value={articleNumber} type={"string"} onChange={onArticleNumberChange}
                                 placeholder={"article number"}/>
                </LabelInput>

                <LabelInput>
                    <label>description of feed</label>
                    <StyledInput value={description} type={"string"} onChange={onDescriptionChange}
                                 placeholder={"description of feed"}/>

                </LabelInput>

                <LabelInput>
                    <label>price per tone in euro</label>
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