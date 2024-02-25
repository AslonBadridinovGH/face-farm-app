import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {Feed} from "../../types/Feed.tsx";
type ViewFeedProps = {
    handleFeedDelete: (id: string) => void
}

function ViewFeed(props : ViewFeedProps) {

    const [feed, setFeeds] = useState<Feed>();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/feeds/${id}`).then(value => setFeeds(value.data))
    }, []);


    const handleFeedDelete = (id: string | undefined) => {
        if (id) {
            props.handleFeedDelete(id)
        }
    }

    return (
        <>
            <StyledDiv>
                <StyledDivInfo>
                    <StyledInfo>

                        <StyledG>
                            <div>{"type of Feed:  "}</div>
                            <div>{feed?.type}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"article number of Feed:  "}</div>
                            <div>{feed?.articleNumber}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"description of feed:  "}</div>
                            <div>{feed?.description}</div>
                        </StyledG>
                        <StyledG>
                            <div>{"price per tone of feed:  "}</div>
                            <div>{feed?.pricePerTone}</div>
                        </StyledG>

                    </StyledInfo>
                    <Link className={"linkButtons"} to={`/farm/feed/${feed?.id}/edit`}>
                        <button>Edit</button>
                        <button onClick={() => handleFeedDelete(feed?.id)}>Delete
                        </button>
                    </Link>
                </StyledDivInfo>
            </StyledDiv>
        </>
    );
}

export default ViewFeed;


const StyledDiv = styled.div`
    
    margin: 2vw;
    padding-top: 1vh;
    width: 60vw;
    height: 60vh;
`;


const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledInfo = styled.div`
    background-color: #b3c0cb;
`;

const StyledG = styled.h2`
    margin: 2vw;
    padding: 0.3rem;
    font-size: 2vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: space-between;
    background-color: azure;
`;
