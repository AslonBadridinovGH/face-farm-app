import "./App.css";
import {ArcElement} from 'chart.js'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {Title, Tooltip, Legend,} from 'chart.js';
import {useEffect, useState} from "react";
import axios from "axios";
import {ConsumeType} from "../../types/Consume.tsx";
Chart.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement, ArcElement, Title, Tooltip, Legend)


export default function ConsumeChart() {

    /*
    const [data, setData] = useState<ConsumeData[]>();

    useEffect(() => {
        axios.get("/api/consumeData").then(response => {
            setData(response.data)
        })
    }, [])



    const [consumeData] = useState({

        labels: data?.map((data) => data.date),
        datasets: [
            {

                label: "Feed Consume",
                data: data?.map((data) => data.feedConsume),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                    "rgba(75,192,192,1)",
                ],
                borderColor: "black",
                borderWidth: 2
            } ,
            {
                label: "Water Consume",
                data: data?.map((data) => data.waterConsume),
                backgroundColor: [
                    "rgb(93,145,93)",
                    "rgb(93,145,93)",
                    "rgb(93,145,93)",
                ],
                borderColor: "black",
                borderWidth: 2
            }

        ]
    });
    */

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

            <div style={{ width: 700 }}>
                <Bar data={data} />
            </div>
        </div>
    );
}





