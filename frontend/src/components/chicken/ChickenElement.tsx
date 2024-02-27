
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Chicken} from "../../types/Chicken.tsx";
type chickenElementProps = {
    chicken: Chicken
}

export default  function ChickenElement(props:chickenElementProps) {

      const navigate= useNavigate();
      const onBoxClick=()=>{
          navigate(`/farm/viewChicken/${props.chicken.id}`)
    }
    return (
        <div>
             <div onClick={onBoxClick} >

                <StyledDiv>
                    <StyledH>
                        <div>{"Race of chicken "}</div>
                        <div>{props.chicken.race}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"Chickens "}</div>
                        <div>{props.chicken.expectedSlaughterAge}</div>
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
    
    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1px rgba(38, 50, 56, 0.10);
    margin: 0.5rem;
    height: 15vh;
    width: 30vw;
    border-radius: 0.375rem;
    background-color: #ced4dc;
    padding: 1rem;
`;


