
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";


export default function FeedConsume() {

     return (

         <StyledDiv>
             <div className={"ClNavLinkFeed"}>
                 <NavLink className={"navLink"} to={"/production/feedConsume/feedTable"} >Consume as Table</NavLink>
                 <NavLink className={"navLink"} to={"/production/feedConsume/feedChart"} >Consume as Diagram</NavLink>
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