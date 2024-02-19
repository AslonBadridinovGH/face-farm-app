
import { Bar } from "react-chartjs-2";
import {DataType} from "../../types/DataType.tsx";

type chartPops ={
    chartData : DataType;
}

function BarChart( props: chartPops ) {
    return <Bar data={props.chartData} />;
}

export default BarChart;