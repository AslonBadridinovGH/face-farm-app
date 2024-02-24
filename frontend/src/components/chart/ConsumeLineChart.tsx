import "./App.css";
import {ArcElement} from 'chart.js'
import {BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {Title, Tooltip, Legend,} from 'chart.js';
import {useEffect, useState} from "react";
import axios from "axios";
import {ConsumeType} from "../../types/Consume.tsx";
import {Line} from "react-chartjs-2";
Chart.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement, ArcElement, Title, Tooltip, Legend)


export default function ConsumeLineChart() {


    const [data, setData] = useState<ConsumeType>();

    useEffect(() => {
        axios.get("/api/consume").then(response => {
            setData(response.data)
        })
    }, [])

    if (data===undefined){
    return <p>Loading...</p>
}
    return (
        <div className="App">
            <Line data={data} />
        </div>
    );
}





