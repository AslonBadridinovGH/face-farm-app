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
import Silos from "./components/SiloComp.tsx";
import {useState} from "react";
import {ChBarn} from "./types/ChickenBarn.tsx";
import {Silo} from "./types/Silo.tsx";


function App() {

    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])
    const [silos, setSilos] = useState<Silo[]>([])

    const addChickenBarn = (chickenBarnToSave:ChBarn)=>{
         setChickenBars([...chickenBarns, chickenBarnToSave] )
    }

    const addSilo = (siloToSave : Silo):void=>{
        setSilos([...silos, siloToSave])
    }

  return (
    <>
         <Navbar/>
         <Routes>
             <Route index element={<Home/>}/>

             <Route path={"/farm"}  element={<AsideMain/>}>
                 <Route index element={<p>Farm ...</p>}/>
                 <Route path={"farmInfo"} element={<FarmInfo/>}/>
                 <Route path={"addFarm"} element={<AddNewFarm/>}/>
                 <Route path={"chickenBarns"} element={<ChickenBarns chickenBarns = {chickenBarns}/>}/>
                 <Route path={"addNewBarn"} element={<AddNewBarn saveBarn = {addChickenBarn} />}/>
                 <Route path={"silos"} element={<Silos silos={silos}/>}  />
                 <Route path={"addSilo"} element={<AddNewSilo saveSilo = {addSilo}/>}/>
             </Route>

             <Route path={"/contact"} element={<Contact/>} />
             <Route path={"/production"} element={<Production/>} />
             <Route path={"/climate"} element={<Clime/>}/>
         </Routes>

    </>
  )
}

export default App
