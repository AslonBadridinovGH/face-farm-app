
import {NavLink, Outlet} from "react-router-dom";
import styled from "styled-components";

export default function AsideMain() {
    return (
        <div className={"asideMain"}>

            <aside>
               <StyledNav>

                    <NavLinks to={"/farm/chickenBarns"}>All Chicken Barns</NavLinks>

                    <NavLinks to={"/farm/silos"}>All Silos</NavLinks>

                    <NavLinks to={"/farm/chickens"}>All Chickens</NavLinks>

                    <NavLinks to={"/farm/feeds"}>All Feeds</NavLinks>

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
    height: auto;
    
    text-decoration: none;
    border-radius: 0.375rem;
    padding: 5px 1.5vw;
    font-size: 1.5vw;
    font-weight: 500;
    margin-right: 0.3vw;
    text-align: start;
   
`;

const StyledNav = styled.nav`
    
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-right: 3rem;
    padding-top: 3rem;
    gap: 20px;
    
`;
