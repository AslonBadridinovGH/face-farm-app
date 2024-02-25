import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Feed} from "../../types/Feed.tsx";

type feedsElementProps = {
    feed: Feed
}
export default  function FeedElement(props:feedsElementProps) {
    const navigate= useNavigate();
        const onBoxClick=()=>{
                navigate(`/farm/viewFeed/${props.feed.id}`)
}

    return (
        <div>
             <div onClick={onBoxClick}>

                <StyledDiv>
                    <StyledH>
                        <div>{"type of Feed"}</div>
                        <div>{props.feed.type}</div>
                    </StyledH>
                    <StyledH>
                        <div>{"article Number of Feed"}</div>
                        <div>{props.feed.articleNumber}</div>
                    </StyledH>
                </StyledDiv>
            </div>

        </div>
    );
}

const StyledH = styled.h2`
    
    background-color: #9ea3a8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    margin: 1vw 0 0 0;
    font-size: 2vw;
    font-style: normal;
`;

const StyledDiv = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    box-shadow: 0 2px 4px 0 rgba(38, 59, 56, 0.10), 0 0 0 1px rgba(38, 50, 56, 0.10);
    margin: 0.5rem;
    height: 15vh;
    width: 30vw;
    border-radius: 0.375rem;
    background-color: #ced4dc;
    padding: 1rem;
`;


