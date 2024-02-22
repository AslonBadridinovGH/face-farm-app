import {useEffect, useState} from "react";
import axios from "axios";
import {ConsumeData} from "../../types/ConsumeData.tsx";



export default function ConsumeTable() {

    const [data, setData] = useState<ConsumeData[]>();

    useEffect(() => {
        axios.get("/api/consumeData").then(response => {
            setData(response.data)
        })
    }, [])

    if (data===undefined) {
        return <p>Loading...</p>
    }

        return (
            <div>
                <table className={"tableStyle"}>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Feed Consume</th>
                        <th>Water Consume</th>
                      </tr>
                         {data.map(({id, date, feedConsume, waterConsume}) => (
                          <tr key={id}>
                              <td>{id}</td>
                              <td>{date}</td>
                              <td>{feedConsume}</td>
                              <td>{waterConsume}</td>
                          </tr> ))
                       }
                    </tbody>
                </table>
            </div>
        );

}
