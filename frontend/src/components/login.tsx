type Props = {
    log: () => void,
}
export default function Login(props:Props) {

    function login(){
        props.log()
    }
    return(
        <>
            <p> Bitte melden Sie sich an um den Service nutzen zu können</p>
            <button onClick={login}>Melden Sie sich bitte an</button>
            <div className={"logImageDiv"}>
                <img className={"logImage"} alt="No such page" src="../../public/bitte-einloggen.jpg"/>
            </div>
        </>)
}
