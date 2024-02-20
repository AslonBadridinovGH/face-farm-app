import styled from "styled-components";

export default function Home() {
    return (
        <StyledDiv>
            <h2>Herzlich willkommen  in Face Farm App!</h2>
            <StyledP>
                  Diese App wurde für den Bauernhof entwickelt, auf dem Masthähnchen gehalten wird.
                Mit Hilfe dieses Programms können Sie mit allen Informationen über den Bauernhof und seine Küken arbeiten.
                Das heißt, es ist möglich, neue Daten einzugeben, anzuzeigen und zu bearbeiten. Anhand des Diagramms lassen
                sich die jährlichen Wirtschaftskennzahlen des Betriebs ablesen.
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

    display: flex;
    justify-content: center;
    text-align: justify;
    width: 70vw;
    font-size: 2vw;
    margin-top: 2vw;
    background-color: #dfe4ea;
    line-height: 40px;
    text-indent: 30px;
    padding: 30px;
    border-radius: 5px;
`;