import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import AsideMain from "./components/AsideMain.tsx";
import Contact from "./components/nextComp/contact.tsx";
import Production from "./components/nextComp/production.tsx";
import Clime from "./components/nextComp/clime.tsx";
import AddNewFarm from "./components/AddNewFarm.tsx";
import AddNewBarn from "./components/AddNewBarn.tsx";
import FarmInfo from "./components/FarmInfo.tsx";
import ChickenBarns from "./components/ChickenBarnComp.tsx";
import AddNewSilo from "./components/AddNewSilo.tsx";
import Silo from "./components/Silo.tsx";
import {useState} from "react";
import {ChBarn} from "./types/ChickenBarn.tsx";


function App() {

    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])

    const addChickenBarn = (chickenBarnToSave:ChBarn)=>{
         setChickenBars([...chickenBarns, chickenBarnToSave] )
    }


  return (
    <>
         <Navbar/>
         <Routes>
             <Route index element={<Home/>}/>

             <Route path={"/farm"}  element={<AsideMain/>}>
                 <Route index element={<p>Farm ...</p>}/>
                 <Route path={"farmInfo"}  element={<FarmInfo/>}/>
                 <Route path={"addFarm"} element={<AddNewFarm/>}/>
                 <Route path={"chickenBarns"} element={<ChickenBarns chickenBarns = {chickenBarns}/>}/>
                 <Route path={"addNewBarn"} element={<AddNewBarn saveBarn = {addChickenBarn} />}/>
                 <Route path={"silos"} element={<Silo/>}/>
                 <Route path={"addSilo"} element={<AddNewSilo/>}/>
             </Route>

             <Route path={"/contact"} element={<Contact/>} />
             <Route path={"/production"} element={<Production/>} />
             <Route path={"/climate"} element={<Clime/>}/>
         </Routes>

    </>
  )
}

export default App
