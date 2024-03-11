
import error from '../../public/error.jpg';

export default function NoPage(){
return(
    <>
      <img className={"errorImage"} alt="No such page" src={error}/>
    </>
)
}