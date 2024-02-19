
import { Line } from "react-chartjs-2";
import {UserDataType} from "../../types/DataType.tsx";

type chartPops ={
    chartData : UserDataType;
}

function LineChart( props: chartPops ) {
    return <Line data={props.chartData} />;
}

export default LineChart;
