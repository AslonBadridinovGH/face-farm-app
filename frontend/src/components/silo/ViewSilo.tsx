import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {Silo} from "../../types/Silo.tsx";

type ViewBarnProps = {
    handleSiloDelete: (id: string) => void
}

function ViewSilo(props : ViewBarnProps) {

    const [silo, setSilos] = useState<Silo>();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/silos/${id}`).then(value => setSilos(value.data))
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

                        <StyledG>
                            <div>{"Number of silo:  "}</div>
                            <div>{silo?.numberOfSilo}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"Capacity of silo:  "}</div>
                            <div>{silo?.capacity}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"Amount of feed:  "}</div>
                            <div>{silo?.amountOfFeed}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"Feeds of silo:  "}</div>
                            <div>{silo?.feeds?.map(value => value.type).join(" and ")}</div>
                        </StyledG>

                    </StyledInfo>
                   <Link className={"linkButtons"} to={`/farm/silo/${silo?.id}/edit`}>
                        <button>Edit</button>
                        <button onClick={() => handleSiloDelete(silo?.id)}>Delete
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
    padding-top: 1vh;
    width: 60vw;
    height: 60vh;
`;


const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledInfo = styled.div`
    background-color: #b3c0cb;
`;

const StyledG = styled.h2`
    margin: 2vw;
    padding: 0.3rem;
    font-size: 2vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: space-between;
    background-color: azure;
`;

