import "./App.css";
import {ArcElement} from 'chart.js'
import {BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {Title, Tooltip, Legend,} from 'chart.js';
import LineChart from "./LineChart.tsx";
import {UserDataType} from "../../types/UserDataType.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
Chart.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement, ArcElement, Title, Tooltip, Legend)


export default function WaterChart() {

    const [userData, setUserData] = useState<UserDataType>();
    useEffect(() => {
        axios.get("/api/userData").then(response => {
            setUserData(response.data)
        })
    }, [])


if (userData===undefined){
    return <p>Loading...</p>
}

    return (
        <div className="App">

            <div style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>

        </div>
    );
}





