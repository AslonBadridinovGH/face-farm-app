
import { Pie } from "react-chartjs-2";
import {DataType} from "../../types/DataType.tsx";

type chartPops ={
    chartData : DataType;
}

function PieChart(props: chartPops) {
    return <Pie data={props.chartData} />;
}

export default PieChart;
