
import {NavLink, Outlet} from "react-router-dom";
import styled from "styled-components";


export default function WaterConsume() {


    return (

        <StyledDiv>
            <div className={"ClNavLinkFeed"}>
                <NavLink className={"navLink"} to={"/production/waterConsume/waterTable"}>Water Consume as Table</NavLink>
                <NavLink className={"navLink"} to={"/production/waterConsume/waterChart"}>Water Consume as Diagram</NavLink>
            </div>

            <div>
                <Outlet/>
            </div>

        </StyledDiv>
    );

}
const StyledDiv = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`;
