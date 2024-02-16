import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {Chicken} from "../../types/Chicken.tsx";

type ViewChickenProps = {
    handleChickenDelete: (id: string) => void
}

function ViewBarn(props : ViewChickenProps) {

    const [chicken, setChicken] = useState<Chicken>();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/chickens/${id}`).then(response => setChicken(response.data))
    }, []);

    const handleChickenDelete = (id: string | undefined) => {
        if (id) {
            props.handleChickenDelete(id)
        }
    }

    return (
        <>
            <StyledDiv>
                <StyledDivInfo>
                    <StyledInfo>
                            <StyledG>
                                <div>{"race of chicken"}</div>
                                <div>{chicken?.race}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"weight in first day"}</div>
                                <div>{chicken?.weightInFirstDay}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"Expected slaughter weight"}</div>
                                <div>{chicken?.expectedSlaughterWeight}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"expected slaughter age"}</div>
                                <div>{chicken?.expectedSlaughterAge}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"feed conversion"}</div>
                                <div>{chicken?.feedConversion}</div>
                            </StyledG>
                            <StyledG>
                                <div>{"hatch day"}</div>
                                <div>{chicken?.hatchDay}</div>
                            </StyledG>
                             <StyledG>
                                <div>{"hatchery"}</div>
                                <div>{chicken?.hatchery}</div>
                            </StyledG>

                    </StyledInfo>
                    <Link to={`/farm/chicken/${chicken?.id}/edit`}>
                        <button>Edit</button>
                        <button className="chicken-delete-button" onClick={() => handleChickenDelete(chicken?.id)}>Delete
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

