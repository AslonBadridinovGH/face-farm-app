import {Silo} from "../types/Silo.tsx";
import SiloElement from "./SiloElement.tsx";
import styled from "styled-components";
import {NavLink} from "react-router-dom";


type viewAllSilos ={
    silos : Silo[];
}

function SiloFunction(props : viewAllSilos) {

    return (
        <StyledDiv>
            <div className={"ClNavLink"}>
                <h2>All Silos</h2>
                <NavLink className={"navLink"} to={"/farm/addSilo"}>Add New Silo</NavLink>
            </div>

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

/*
const NavLinks = styled(NavLink)`

    color: #ffffff;
    width: auto;
    height: 30px;
    text-decoration: none;
    border-radius: 0.375rem;
    padding: 5px 4.5vw;
    font-size: 1.5vw;
    font-weight: 500;
    margin-right: 0.3vw;
    text-align: start;
    line-height: 30px;
    background-color: yellow;
`;*/
