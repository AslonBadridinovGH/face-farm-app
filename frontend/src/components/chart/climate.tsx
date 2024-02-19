
import "../../App.css";
import { UserData } from "./Data.tsx";
import {ArcElement} from 'chart.js'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {Title, Tooltip, Legend,} from 'chart.js';
import LineChart from "./LineChart.tsx";
import PieChart from "./PieChart.tsx";
import {UserDataType} from "../../types/DataType.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
Chart.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement, ArcElement, Title, Tooltip, Legend)


export default function Climate() {

    const [userData, setUserData] = useState<UserDataType>();

    useEffect(() => {
        axios.get("/api/userData").then(response => setUserData(response.data))
    }, [])


    const  userDataVar : UserDataType = {

        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2
            } ,
            {
                label: "Users Lost",
                data: UserData.map((data) => data.userLost),
                backgroundColor: [
                    "rgb(192,73,190)",
                    "#ecf0f1",
                    "#5b867d",
                    "#50493e",
                    "#445062",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    };


    return (
        <div className="App">

            <div style={{ width: 700 }}>
                <Bar data={userData} />
            </div>

            <div style={{ width: 700 }}>
                <LineChart chartData={userDataVar} />
            </div>

            <div style={{ width: 700 }}>
                <PieChart chartData={userDataVar} />
            </div>

        </div>
    );
}





