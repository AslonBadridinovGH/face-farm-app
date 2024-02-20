
import { Bar } from "react-chartjs-2";
import {UserDataType} from "../../types/UserDataType.tsx";

type chartPops ={
    chartData : UserDataType;
}

export default  function BarChart( props: chartPops ) {
    return <Bar data={props.chartData} />;
}

