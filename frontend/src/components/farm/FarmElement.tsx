import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Farm} from "../../types/Farm.tsx";
type farmsElementProps = {
    farm : Farm
}
export default function FarmElement(props : farmsElementProps) {
    const navigate= useNavigate();
        const onBoxClick=()=>{
            navigate(`/farm/viewFarm/${props.farm.id}`)
}

    return (
        <div>
             <div onClick={onBoxClick} className="barns">

                <StyledDiv>
                    <StyledH>
                        <div>{"Name of Farm"}</div>
                        <div>{props.farm?.name}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Address of Farm"}</div>
                        <div>{props.farm?.address}</div>
                    </StyledH>
                </StyledDiv>
            </div>

        </div>
    );
}

const StyledH = styled.h2`
    
    background-color: #9ea3a8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    margin: 1vw 0 0 0;
    font-size: 2vw;
    font-style: normal;
`;

const StyledDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    
    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1.5px rgba(38, 50, 56, 0.10);
    margin: 0.25rem;
    height: 5rem;
    width: 26rem;
    border-radius: 0.375rem;
    border-color: rgb(221 221 221);
    background-color: red;
    padding: 1.25rem;
`;


