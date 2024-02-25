import {Farm} from "../../types/Farm.tsx";
import {NavLink} from "react-router-dom";
import FarmElement from "./FarmElement.tsx";
import styled from "styled-components";

type farmInfo = {
    farm : Farm []
    handleFarmDelete: (id: string) => void
}

export default function FarmInfo(props : farmInfo) {
    return (

    <StyledDiv>

        <div className={"ClNavLink"}>
            <h2>Farm Infos</h2>
            <NavLink className={"navLink"} to={`/farm/farmInfo/${ props.farm.map(value => value.id) }/edit`}>Change Farm Infos</NavLink>
        </div>

       <div>
           {props.farm.map(value => (<FarmElement key={value.id} farm={value} handleFarmDelete={props.handleFarmDelete} />))}
       </div>

    </StyledDiv>

    );
}

const StyledDiv =styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;