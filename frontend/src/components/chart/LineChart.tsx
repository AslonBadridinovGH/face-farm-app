
import { Line } from "react-chartjs-2";
import {DataType} from "../../types/DataType.tsx";

type chartPops ={
    chartData : DataType;
}

function LineChart( props: chartPops ) {
    return <Line data={props.chartData} />;
}

export default LineChart;
