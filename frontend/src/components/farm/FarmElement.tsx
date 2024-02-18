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
                     <StyledDivInfo>
                         <StyledInfo>

                             <StyledG>
                                 <div>{"Name of Farm:  "}</div>
                                 <div>{farm?.name}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Activity of Farm:  "}</div>
                                 <div>{farm?.activity}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Address of Farm:  "}</div>
                                 <div>{farm?.address}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"Area of Farm:  "}</div>
                                 <div>{farm?.area}</div>
                             </StyledG>
                             <StyledG>
                                 <div>{"construction year of Farm:  "}</div>
                                 <div>{farm?.constructionYear}</div>
                             </StyledG>
                         </StyledInfo>

                     </StyledDivInfo>
                 </StyledDiv>
            </div>

    );
}


const StyledDiv = styled.div`
    margin: 2vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: red;
`;

const StyledDivInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1vw;
    background-color: #213547;
`;

const StyledInfo = styled.div`
    margin: 1vw;
    background-color: yellow;
`;

const StyledG = styled.h2`
    margin: 2vw;
    font-size: 2vw;
    display: flex;
    flex-direction: row;
    gap: 5vw;
    justify-content: space-between;
    background-color: #646cff;
`;

