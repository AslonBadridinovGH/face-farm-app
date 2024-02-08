
import {NavLink, Outlet} from "react-router-dom";
import styled from "styled-components";

export default function Aside_main() {
    return (
        <div className={"farm"}>
            <aside >
                <NavLinks to={"/farm/farmInfo"} className={({ isActive }) => (isActive ? 'active' : '')}>Farm Info</NavLinks>
                <NavLinks to={"/farm/addFarm"} >Add New Farm</NavLinks>
                <NavLinks to={"/farm/addNewBarn"}>Add New Chicken Barn</NavLinks>
                <NavLinks to={"/farm/chickenBarn"}>All Chicken  Barns</NavLinks>
                <NavLinks to={"/farm/addSilo"}>Add New Silo</NavLinks>
                <NavLinks to={"/farm/silos"}>All Silos</NavLinks>
            </aside>
            <main>
                 <Outlet/>
            </main>
        </div>
    );
}
const NavLinks = styled(NavLink)`
    
    color: #ffffff;
    width: auto;
    height: 30px;
    text-decoration: none;
    border-radius: 0.375rem;
    padding: 5px 1.5vw;
    font-size: 1.5vw;
    font-weight: 500;
    margin-right: 0.3vw;
    text-align: start;
    line-height: 30px;

`;

