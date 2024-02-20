import styled from "styled-components";
import {Silo} from "../../types/Silo.tsx";
import {useNavigate} from "react-router-dom";
type barnsElementProps = {
    silo: Silo
}
export default function SiloElement(props : barnsElementProps) {
    const navigate= useNavigate();
        const onBoxClick=()=>{
            navigate(`/farm/viewSilo/${props.silo.id}`)
}

    return (
        <div>
             <div onClick={onBoxClick} className="barns">

                <StyledDiv>
                    <StyledH>
                        <div>{"Number of Silo"}</div>
                        <div>{props.silo?.numberOfSilo}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Amount of Feed"}</div>
                        <div>{props.silo?.amountOfFeed}</div>
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
    justify-content: center;

    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1.5px rgba(38, 50, 56, 0.10);
    margin: 0.25rem;
    height: 5rem;
    width: 30vw;
    border-radius: 0.375rem;
    border-color: rgb(221 221 221);
    background-color: red;
    padding: 1.25rem;
`;


