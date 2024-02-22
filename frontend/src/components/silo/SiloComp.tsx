import {Silo} from "../../types/Silo.tsx";
import SiloElement from "./SiloElement.tsx";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type viewAllSilos ={
    silos : Silo[];
}

export default function Silos(props : viewAllSilos) {

    return (
        <StyledDiv>
            <div className={"ClNavLink"}>
                <h2>All Silos</h2>
                <NavLink className={"navLink"} to={"/farm/addSilo"}>Add New Silo</NavLink>
            </div>

            <div className="elementsBox">
            {props.silos.map(value => (<SiloElement key={value.id} silo={value}/>))}
          </div>
        </StyledDiv>
);
}

const StyledDiv =styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`;

