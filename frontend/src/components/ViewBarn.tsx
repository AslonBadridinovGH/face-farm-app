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
                                <div>{"Area of Chicken Barn:  "}</div>
                                <div>{barn?.area}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Capacity for chickens:  "}</div>
                                <div>{barn?.capacityForChickens}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Amount of chickens:  "}</div>
                                <div>{barn?.amountOfChickens}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Chickens of Chicken Barn:  "}</div>
                                <div>{barn?.chickens?.map(value => value.race).join(", ")}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Silos of Chicken Barn:  "}</div>
                                <div>{barn?.silos?.map(value => value.numberOfSilo).join(", ")}</div>
                            </StyledG>
                    </StyledInfo>
                    <Link to={`/farm/chickenBarn/${barn?.id}/edit`}>
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

