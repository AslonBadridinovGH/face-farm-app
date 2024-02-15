import {ChBarn} from "../types/ChickenBarn.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
type barnsElementProps = {
    barn: ChBarn
}
export default  function ChickenBarnElement(props:barnsElementProps) {
      const navigate= useNavigate();
      const onBoxClick=()=>{
          navigate(`/farm/viewBarn/${props.barn.id}`)
    }
    return (
        <div>
             <div onClick={onBoxClick} className="barns">

                <StyledDiv>
                    <StyledH>
                        <div>{"Number of Chicken Barns"}</div>
                        <div>{props.barn.name}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Amount of chickens  "}</div>
                        <div>{props.barn.amountOfChickens}</div>
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

