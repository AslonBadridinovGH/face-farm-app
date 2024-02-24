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

            <StyledDivAddFarm>Edit Silo Infos</StyledDivAddFarm>
            <StyledFormAdd onSubmit={onFarmSubmit}>

                <label>type of feed</label>
                <SInput value={type} type={"string"} onChange={onTypeChange}
                        placeholder={"type of feed"}/>

                <label>article number</label>
                <SInput value={articleNumber} type={"string"} onChange={onArticleNumberChange}
                        placeholder={"article number"}/>

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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: initial;
    width: 60%;
`;

const SInput = styled.input`
    margin: 0.5vw 0 0.5vw 0;
`;