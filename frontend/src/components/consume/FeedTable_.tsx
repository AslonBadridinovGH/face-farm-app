/*

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useState} from "react";




export default function FeedTable_() {

        // Row Data: The data to be displayed.
        const [rowData] = useState([

            { day : "2023.12.01", feed_Consume: 500, water_Consume: 500},
            { day : "2023.12.02", feed_Consume: 600, water_Consume: 400},
            { day : "2023.12.03", feed_Consume: 700, water_Consume: 300},
        ]);

        // Column Definitions: Defines the columns to be displayed.
        const [colDefs] = useState< {field: "day" | "feed_Consume" | "water_Consume" }[] >([
            { field: "day" },
            { field: "feed_Consume" },
            { field: "water_Consume" }
        ]);


     return (
         <div className={"agTable"}>
             <div className="ag-theme-quartz">
                 <AgGridReact rowData={rowData} columnDefs={colDefs}/>
             </div>
         </div>
     );
}

*/
