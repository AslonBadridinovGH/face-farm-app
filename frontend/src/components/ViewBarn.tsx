import {useEffect, useState} from "react";
import axios from "axios";
import {ChBarn} from "../types/ChickenBarn.tsx";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";


type ViewBarnProps = {
    handleBarnDelete: (id: string) => void
}

function ViewBarn(props : ViewBarnProps) {

    const [barn, setBarns] = useState<ChBarn>();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/barn/${id}`).then(value => setBarns(value.data))
    }, []);

    const handleBarnDelete = (id: string | undefined) => {
        if (id) {
            props.handleBarnDelete(id)
        }
    }

    return (
        <>
            <StyledDiv>
                <StyledDivInfo>
                    <StyledInfo>
                        <StyledTitle>{barn?.capacityOfBarn}</StyledTitle>
                        <StyledAuthor>{barn?.amountOfAnimals}</StyledAuthor>
                        <StyledG>{barn?.numberOfBarn}.</StyledG>
                        <StyledG>{barn?.area}.</StyledG>
                        <StyledG>{barn?.silos}.</StyledG>
                        <StyledG>{barn?.chicken}.</StyledG>
                    </StyledInfo>
                    <Link to={`/barns/${barn?.id}/edit`}>
                        <button>Edit</button>
                        <button className="barn-delete-button" onClick={() => handleBarnDelete(barn?.id)}>Delete
                        </button>
                    </Link>
                </StyledDivInfo>
            </StyledDiv>
        </>
    );
}

export default ViewBarn;


const StyledDiv = styled.div`
    margin: 2vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;
const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const StyledTitle = styled.h1`
    font-size: 4vw;
    margin: 1vw;
`;
const StyledAuthor = styled.h2`
    margin: 2vw 0 0 1vw;
    font-size: 3vw;
    font-style: italic;
`;
const StyledInfo = styled.div`
    margin: 5vw 1vw 0 1vw;
`;

const StyledG = styled.h2`
    margin: 1vw;
    font-size: 2vw;
`;

