
import { Pie } from "react-chartjs-2";
import {UserDataType} from "../../types/UserDataType.tsx";

type chartPops ={
    chartData : UserDataType;
}

function PieChart(props: chartPops) {
    return <Pie data={props.chartData} />;
}

export default PieChart;
