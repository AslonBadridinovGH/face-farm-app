import styled from "styled-components";

export default function Home() {
    return (
        <StyledDiv>

            <h2>Herzlich willkommen  in Face Farm App!</h2>

            <StyledP>
                  Diese App wurde für den Bauernhof entwickelt, auf dem Masthähnchen gehalten wird.
                Mit Hilfe dieses Programms können Sie mit allen Informationen über den Bauernhof und seine Küken arbeiten.
                Das heißt, es ist möglich, neue Daten einzugeben, anzuzeigen und zu bearbeiten. Mithilfe von Diagrammen
                und Tabellen lässt sich der tägliche Wasser- und Futterverbrauch der Küken erkennen.
            </StyledP>

        </StyledDiv>

    );
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:99vw;
    padding-top: 5vh;
`;

const StyledP = styled.p`
    
    background-color: #dfe4ea;
    display: flex;
    justify-content: center;
    text-align: justify;
    width: 70vw;
    font-size: 1rem;
    margin-top: 2vw;
    line-height: 4vw;
    text-indent: 30px;
    padding: 2rem;
    border-radius: 5px;
`;