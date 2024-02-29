import {NavLink} from "react-router-dom";
import styled from "styled-components";

type PropsNavBar = {
    log: ()=>void,
    userSet:string,
    userLoad:()=> void,
    outLog:()=>void,
}

export default  function Navbar(props:PropsNavBar) {
    return (
        <div>
            <StyledNav>
                <NavLinks to={"/"}>About</NavLinks>
                <NavLinks to={"/farm"}>Farm</NavLinks>
                <NavLinks to={"/production"}>Production</NavLinks>
                {props.userSet !== "anonymousUser" && props.userSet !== undefined ?
                    <div className={"divContainer"}>
                        <p>User: {props.userSet}</p>
                        <button onClick={props.outLog} title={"LOGOUT"}>Logout</button>
                    </div> :
                    <button onClick={props.log}>Login</button>}
            </StyledNav>

        </div>
    );
}

const StyledNav = styled.nav`
    
    background-color: #7e878c;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.8rem;
    padding-right: 1rem;
`;

const NavLinks = styled(NavLink)`
    
    color: #ffffff;
    width: auto;
    height: auto;
    text-decoration: none;
    border-radius: 0.375rem;
    padding: 1vw;
    font-size: 1.5vw;
    font-weight: 400;
    margin-right: 0.3vw;
    text-align: center;
    line-height: 30px;
    
`;



