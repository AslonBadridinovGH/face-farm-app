import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {FatPeriod} from "../../types/FatteningPeriod.tsx";
type barnsElementProps = {
    period: FatPeriod
}
export default  function FatteningPeriodElement(props:barnsElementProps) {
      const navigate= useNavigate();
      const onBoxClick=()=>{
          navigate(`/production/viewFattening/${props.period.id}`)
    }
    return (
        <div>
             <div onClick={onBoxClick}>

                <StyledDiv>
                    <StyledH>
                        <div>{"startDate of fattening period: "}</div>
                        <div>{props.period.startDate}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Current old chickens  "}</div>
                        <div>{props.period.currentOld}</div>
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
    font-size: 1.8vw;
    font-style: normal;
`;

const StyledDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1.5px rgba(38, 50, 56, 0.10);
    margin: 0.25rem;
    height: 5rem;
    width: 32.5vw;
    border-radius: 0.375rem;
    border-color: rgb(221 221 221);
    background-color: red;
    padding: 1rem;
`;

