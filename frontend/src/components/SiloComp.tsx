import {Silo} from "../types/Silo.tsx";
import SiloElement from "./SiloElement.tsx";
import styled from "styled-components";


type viewAllSilos ={
    silos : Silo[];
}

function SiloFunction(props : viewAllSilos) {

    return (
        <StyledDiv>
          <h2>Chicken Bars</h2>
          <div className="barns">
            {props.silos.map(value => (<SiloElement key={value.id} silo={value}/>))}
          </div>
        </StyledDiv>
);
}

export default SiloFunction;

const StyledDiv =styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`;