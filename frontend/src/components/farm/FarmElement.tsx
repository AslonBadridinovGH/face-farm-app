import styled from "styled-components";
import {Farm} from "../../types/Farm.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

type farmsElementProps = {
    farm : Farm
    handleFarmDelete: (id: string) => void
}

export default function FarmElement(props : farmsElementProps) {

    const [farm, setFarm] = useState<Farm>(props.farm);

    useEffect(() => {
        axios.get(`/api/farm/${farm?.id}`).then(value => setFarm(value.data))
    }, []);

    return (
        <div>
                 <StyledDiv>

                             <StyledG>
                                 <div>{"Name of  the Farm:  "}</div>
                                 <div>{farm?.name}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Activity of  the Farm:  "}</div>
                                 <div>{farm?.activity}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Address of  the Farm:  "}</div>
                                 <div>{farm?.address}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Area of  the Farm:  "}</div>
                                 <div>{farm?.area}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Construction year of  the Farm:  "}</div>
                                 <div>{farm?.constructionYear}</div>
                             </StyledG>

                 </StyledDiv>
            </div>

    );
}


const StyledDiv = styled.div`
    
    margin: 2vw;
    padding-top: 1vh;
    width: 55vw;
    height: 60vh;
    
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

