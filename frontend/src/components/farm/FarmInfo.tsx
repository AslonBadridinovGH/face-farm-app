import {Farm} from "../../types/Farm.tsx";

type farmInfo = {
    farm : Farm []
}

export default function FarmInfo(props : farmInfo) {
    return (
        <div>
            {props.farm.map(value => value.activity)}
        </div>
    );
}
