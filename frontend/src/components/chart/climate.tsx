
import { useState } from "react";
import "../../App.css";
import { UserData } from "./Data.tsx";
import {Bar} from "react-chartjs-2";

export default function Climate() {

    const [userData, setUserData] = useState(
        {
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),

            },
        ],
    });
     console.log(userData)

    return (
        <div className="App">
            <div style={{ width: 700 }}>
                <Bar data={userData} />
            </div>

         {/*  <div style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>
            <div style={{ width: 700 }}>
                <PieChart chartData={userData} />
            </div>*/}

        </div>
    );
}





