import einloggen from '../../public/einloggen.jpg';

type Props = {
    log: () => void,
}
export default function Login(props:Props) {

    function login(){
        props.log()
    }

    return(
        <>
            <button onClick={login}>Melden Sie sich bitte an</button>
            <div className={"logImageDiv"}>
                <img className={"logImage"} alt="No such page" src={einloggen}/>
            </div>
        </>)
}
