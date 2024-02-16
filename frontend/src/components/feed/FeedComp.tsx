
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Feed} from "../../types/Feed.tsx";
import FeedElement from "./FeedElement.tsx";


type viewAllFeeds ={
    feeds : Feed[];
}

export default function Feeds(props : viewAllFeeds) {

    return (
        <StyledDiv>
            <div className={"ClNavLink"}>
                <h2>All Feeds</h2>
                <NavLink className={"navLink"} to={"/farm/addFeed"}>Add New Feed</NavLink>
            </div>

            <div className="barns">
            {props.feeds.map(value => (<FeedElement key={value.id} feed={value}/>))}
          </div>
        </StyledDiv>
);
}


const StyledDiv =styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`;

