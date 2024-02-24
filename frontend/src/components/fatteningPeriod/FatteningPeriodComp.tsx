import FatteningPeriodElement from "./FatteningPeriodElement.tsx";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {FatPeriod} from "../../types/FatteningPeriod.tsx";

type viewAllFatPeriodsProps = {
    fatteningsPeriods: FatPeriod[];
}

export default  function FatteningPeriod(props: viewAllFatPeriodsProps) {
    return (
        <StyledDiv>

            <div className={"ClNavLink"}>
                <h2>All Fattenings Periods</h2>
                <NavLink className={"navLink"} to={"/production/addFattening"}>Add New Fattening Periods</NavLink>
            </div>

            <div className="elementsBox">
                {props.fatteningsPeriods.map(period => (<FatteningPeriodElement key={period.id} period={period}/>))}
            </div>

        </StyledDiv>
);
}

const StyledDiv =styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
`;

