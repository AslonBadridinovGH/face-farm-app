import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {FatPeriod} from "../../types/FatteningPeriod.tsx";

type ViewFatteningProps = {
    handleFatPeriodDelete: (id: string) => void
}

function ViewFatteningPeriod(props : ViewFatteningProps) {

    const [fattening, setFattening] = useState<FatPeriod>();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/fattening/${id}`).then(response => setFattening(response.data))
    }, []);

    const handleBarnDelete = (id: string | undefined) => {
        if (id) {
            props.handleFatPeriodDelete(id)
        }
    }

    return (
        <>
            <StyledDiv>
                <StyledDivInfo>
                    <StyledInfo>
                           <StyledG>
                             <div>{"Chickens:  "}</div>
                             <div>{fattening?.chickens?.map(value => value.race).join(" and ")}</div>
                           </StyledG>
                           <StyledG>
                                <div>{"Start  day of fattening:  "}</div>
                                <div>{fattening?.startDate}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"current day of fattening:"}</div>
                                <div>{fattening?.currentDate}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"current old of chickens:  "}</div>
                                <div>{fattening?.currentOld}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"current feeding phase of chickens:  "}</div>
                                <div>{fattening?.currentFeedingPhase}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"lost today of chickens:  "}</div>
                                <div>{fattening?.lostToDay}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"total lost of chickens:  "}</div>
                                <div>{fattening?.totalLost}</div>
                            </StyledG>
                            <StyledG>
                               <div>{"date of slaughter of chickens:  "}</div>
                               <div>{fattening?.dateOfSlaughter}</div>
                            </StyledG>

                    </StyledInfo>
                    <Link className={"linkButtons"} to={`/production/fattening/${fattening?.id}/edit`}>
                        <button>Edit</button>
                        <button className="fattening-delete-button" onClick={() => handleBarnDelete(fattening?.id)}>Delete
                        </button>
                    </Link>
                </StyledDivInfo>
            </StyledDiv>
        </>
    );
}

export default ViewFatteningPeriod;


const StyledDiv = styled.div`
    
    margin: 2vw;
    padding-top: 1vh;
    width: 60vw;
    height: 60vh;
`;


const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledInfo = styled.div`
    background-color: #b3c0cb;
`;

const StyledG = styled.h2`
    margin: 1vw;
    padding: 0.3rem;
    font-size: 1.7vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: space-between;
    background-color: azure;
`;
