
import { Bar } from "react-chartjs-2";
import {UserDataType} from "../../types/DataType.tsx";

type chartPops ={
    chartData : UserDataType;
}

function BarChart( props: chartPops ) {
    return <Bar data={props.chartData} />;
}

export default BarChart;