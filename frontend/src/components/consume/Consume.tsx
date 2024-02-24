
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";


export default function Consume() {

     return (

         <StyledDiv>
             <div className={"ClNavLinkFeed"}>
                 <NavLink className={"navLink"} to={"/production/consume/consumeTable"} >Consume as Table</NavLink>
                 <NavLink className={"navLink"} to={"/production/consume/consumeBarChart"} >Consume as Column Diagram</NavLink>
                 <NavLink className={"navLink"} to={"/production/consume/consumeLineChart"} >Consume as Line Diagram</NavLink>
                 <NavLink className={"navLink"} to={"/production/consume/consumePieChart"} >Consume as Circle Diagram</NavLink>
             </div>

             <div className={"outletClass"}>
                 <Outlet/>
             </div>

         </StyledDiv>

     );
}

const StyledDiv = styled.div`

    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;