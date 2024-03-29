import {useEffect, useState} from "react";
import axios from "axios";
import {ChBarn} from "../../types/ChickenBarn.tsx";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";

type ViewBarnProps = {
    handleBarnDelete: (id: string) => void
}

function ViewChickenBarn(props : ViewBarnProps) {

    const [barn, setBarns] = useState<ChBarn>();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/chickenBarns/${id}`).then(response => setBarns(response.data))
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
                            <StyledG>
                                <div>{"Number of Chicken Barn:  "}</div>
                                <div>{barn?.name}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Area of chicken barn:  "}</div>
                                <div>{barn?.area}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Capacity of barn:  "}</div>
                                <div>{barn?.capacityForChickens}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Amount of all chickens:  "}</div>
                                <div>{barn?.amountOfChickens}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Chickens of chicken barn:  "}</div>
                                <div>{barn?.chickens?.map(value => value.race).join(" and ")}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Silos of chicken barn:  "}</div>
                                <div>{barn?.silos?.map(value => value.numberOfSilo).join(" and ")}</div>
                            </StyledG>
                    </StyledInfo>
                    <Link className={"linkButtons"}  to={`/farm/chickenBarn/${barn?.id}/edit`}>
                        <button>Edit</button>
                        <button onClick={() => handleBarnDelete(barn?.id)}>Delete
                        </button>
                    </Link>
                </StyledDivInfo>
            </StyledDiv>
        </>
    );
}

export default ViewChickenBarn;


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
