import {Farm} from "../../types/Farm.tsx";
import {NavLink} from "react-router-dom";
import FarmElement from "./FarmElement.tsx";
import styled from "styled-components";

type farmInfo = {
    farm : Farm []
}

export default function FarmInfo(props : farmInfo) {
    return (

    <StyledDiv>
        <div className={"ClNavLink"}>
            <h2>All Farms</h2>
            <NavLink className={"navLink"} to={"/farm/addFarm"}>Add New Farm</NavLink>
        </div>

        <div className="barns">
            {props.farm.map(value => (<FarmElement key={value.id} farm={value}/>))}
        </div>
    </StyledDiv>
)
    ;
}


const StyledDiv =styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`;