
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Chicken} from "../../types/Chicken.tsx";
import ChickenElement from "./ChickenElement.tsx";


type viewAllBarnsProps = {
    chickens: Chicken[];
}

export default  function Chickens(props: viewAllBarnsProps) {
    return (
        <StyledDiv>
            <div className={"ClNavLink"}>
                <h2>Chickens</h2>
                <NavLink className={"navLink"} to={"/farm/addChicken"}>Add New Chicken </NavLink>
            </div>
            <div className="barns">
                {props.chickens.map(chicken => (<ChickenElement key={chicken.id} chicken={chicken}/>))}
            </div>
        </StyledDiv>
);
}

const StyledDiv =styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
`;

