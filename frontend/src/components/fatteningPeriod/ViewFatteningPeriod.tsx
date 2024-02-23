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
                                <div>{fattening?.lostToday}</div>
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
                    <Link to={`/production/fattening/${fattening?.id}/edit`}>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: red;
`;

const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1vw;
    background-color: #213547;
`;

const StyledInfo = styled.div`
    margin: 1vw;
    background-color: yellow;
`;

const StyledG = styled.h2`
    margin: 2vw;
    font-size: 2vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: space-between;
    background-color: #646cff;
`;

