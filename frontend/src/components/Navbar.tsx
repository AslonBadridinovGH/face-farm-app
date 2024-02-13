import {NavLink} from "react-router-dom";
import styled from "styled-components";


export default  function Navbar() {
    return (
        <div>
            <StyledNav>
                <NavLinks to={"/"}>Home</NavLinks>
                <NavLinks to={"/farm"}>Farm</NavLinks>
                <NavLinks to={"/production"}>Production</NavLinks>
                <NavLinks to={"climate"}>Climate</NavLinks>
                <NavLinks to={"/contact"}>Contact</NavLinks>
            </StyledNav>

        </div>
    );
}

const StyledNav = styled.nav`
    background-color: #7e878c;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 0.5rem;

`;
const NavLinks = styled(NavLink)`
    color: #ffffff;
    width: 90px;
    height: 50px;
    text-decoration: none;
    border-radius: 0.375rem;
    padding: 1vw;
    font-size: 1.5vw;
    font-weight: 500;
    margin-right: 0.3vw;
    text-align: center;
    line-height: 50px;
`;

