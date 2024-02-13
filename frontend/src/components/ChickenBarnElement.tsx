import {ChBarn} from "../types/ChickenBarn.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

type barnsElementProps = {
    barn: ChBarn
}

export default  function ChickenBarnElement(props:barnsElementProps) {


      const navitage= useNavigate();

      const onBoxClick=()=>{
      navitage(`view/${props.barn.id}`)
    }

    return (
        <div>

             <div onClick={onBoxClick} className="barns">

                <StyledDiv>
                    <StyledH>{props.barn.numberOfBarn}</StyledH>
                </StyledDiv>

            </div>

        </div>
    );
}

const StyledH = styled.h2`
    margin: 1vw 0 0 0;
    font-size: 2vw;
    font-style: normal`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1.5px rgba(38, 50, 56, 0.10);
    margin: .25rem;
    height: 18rem;
    width: 20rem;
    border-radius: 0.375rem;
    border-color: rgb(221 221 221);
    background-color: white;
    padding: 1.25rem;
    
`;

