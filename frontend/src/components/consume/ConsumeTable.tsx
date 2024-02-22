import {useState} from "react";



export default function ConsumeTable() {


        const [students] = useState([

            { id: 1, day : "2023.12.01", feed_Consume: 500, water_Consume: 500},
            { id: 2, day : "2023.12.02", feed_Consume: 600, water_Consume: 400},
            { id: 3, day : "2023.12.03", feed_Consume: 700, water_Consume: 300},

        ]);

        return (
            <div>
                <table className={"tableStyle"}>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Day</th>
                        <th>feed_Consume</th>
                        <th>water_Consume</th>
                    </tr>
                         {students.map(({id, day, feed_Consume, water_Consume}) => (
                          <tr key={id}>
                              <td>{id}</td>
                              <td>{day}</td>
                              <td>{feed_Consume}</td>
                              <td>{water_Consume}</td>
                          </tr> ))
                       }
                    </tbody>
                </table>
            </div>
        );

}
