import {ChBarn} from "../types/ChickenBarn.tsx";
import ChickenBarnElement from "./ChickenBarnElement.tsx";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type viewAllBarnsProps = {
    chickenBarns: ChBarn[];
}


export default  function ChickenBarns(props: viewAllBarnsProps) {
    return (
        <StyledDiv>

            <div className={"ClNavLink"}>
                <h2>Chicken Bars</h2>
                <NavLink className={"navLink"} to={"/farm/addNewBarn"}>Add New Chicken Barn</NavLink>
            </div>

            <div className="barns">
                {props.chickenBarns.map(barn => (<ChickenBarnElement key={barn.id} barn={barn}/>))}
            </div>

        </StyledDiv>
);
}

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
    background-color: red;

`;*/
