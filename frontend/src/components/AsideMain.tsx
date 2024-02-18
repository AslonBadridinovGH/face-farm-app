
import {NavLink, Outlet} from "react-router-dom";
import styled from "styled-components";

export default function AsideMain() {
    return (
        <div className={"farm"}>

            <aside>
               <StyledNav>
                    <NavLinks to={"/farm/farmInfo"} >Farm Info</NavLinks>

                    <NavLinks to={"/farm/chickenBarns"}>All Chicken Barns</NavLinks>

                    <NavLinks to={"/farm/silos"}>All Silos</NavLinks>

                    <NavLinks to={"/farm/chickens"}>All chickens</NavLinks>

                    <NavLinks to={"/farm/feeds"}>All feeds</NavLinks>
                </StyledNav>

            </aside>

            <main>
                 <Outlet/>
            </main>

        </div>
    );
}


const NavLinks = styled(NavLink)`
    
    color: #ffffff;
    width: 100%;
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

const StyledNav = styled.nav`
    
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-right: 5rem;
    gap: 20px;
    
`;
