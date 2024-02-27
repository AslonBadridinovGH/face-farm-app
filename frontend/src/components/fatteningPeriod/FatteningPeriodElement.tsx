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

             <div onClick={onBoxClick}>

                <StyledDiv>
                    <StyledH>
                        <div>{"Start date of fattening period: "}</div>
                        <div>{props.period.startDate}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Current old chickens  "}</div>
                        <div>{props.period.currentOld}</div>
                    </StyledH>
                </StyledDiv>

            </div>
    );
}


const StyledH = styled.h2`

    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 0.2vw 0 0 0;
    font-size: 2vw;
    font-style: normal;
`;

const StyledDiv = styled.div`

    display: flex;
    flex-direction: column;
    gap: 2px;

    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1px rgba(38, 50, 56, 0.10);

    height: 10vh;
    width: 45vw;
    border-radius: 0.375rem;
    background-color: #d0d7e0;
    padding: 0.5rem;
   

`;
