import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {Silo} from "../types/Silo.tsx";


type ViewBarnProps = {
    handleSiloDelete: (id: string) => void
}

function ViewSilo(props : ViewBarnProps) {

    const [silo, setSilos] = useState<Silo>();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/silo/${id}`).then(value => setSilos(value.data))
    }, []);


    const handleSiloDelete = (id: string | undefined) => {
        if (id) {
            props.handleSiloDelete(id)
        }
    }

    return (
        <>
            <StyledDiv>
                <StyledDivInfo>
                    <StyledInfo>
                        <StyledTitle>{silo?.amountFeed}</StyledTitle>
                        <StyledAuthor>{silo?.numberOfSilo}</StyledAuthor>
                        <StyledG>{silo?.capacity}.</StyledG>
                        <StyledG>{silo?.currentFeed}.</StyledG>
                    </StyledInfo>
                    <Link to={`/silos/${silo?.id}/edit`}>
                        <button>Edit</button>
                        <button className="silo-delete-button" onClick={() => handleSiloDelete(silo?.id)}>Delete
                        </button>
                    </Link>
                </StyledDivInfo>
            </StyledDiv>
        </>
    );
}

export default ViewSilo;


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

