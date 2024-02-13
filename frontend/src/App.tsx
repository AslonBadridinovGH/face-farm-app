import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
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
import ViewBarn from "./components/ViewBarn.tsx";
import axios from "axios";
import EditChickenBarn from "./components/EditChickenBarn.tsx";


function App() {


    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])
    const [silos, setSilos] = useState<Silo[]>([])

    const navigate = useNavigate()

    const addChickenBarn = (chickenBarnToSave:ChBarn)=>{
         setChickenBars([...chickenBarns, chickenBarnToSave] )
    }

    const addSilo = (siloToSave : Silo):void=>{
        setSilos([...silos, siloToSave])
    }

    const deleteBarn = (id: string) => {
        axios.delete(`/api/barns/${id}`)
            .then(response => {
                setChickenBars([...chickenBarns.filter(barn => id !== barn.id)]);
                navigate("/farm/chickenBarns")
                return console.log(response.data)
            })
    }
    const editBarn = (barn: ChBarn): void => {
        axios.put(`/api/barns/${barn.id}`, barn)
            .then(response => {
                setChickenBars(chickenBarns.map((item) => (item.id === barn.id ? response.data : item)))
                    navigate("/barns/" + response.data.id)
                }
            )
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
                 <Route path={"view/:id"} element={<ViewBarn handleBarnDelete={deleteBarn}/>}/>
                 <Route path="/barn/:id/edit" element={<EditChickenBarn chickenBarns={chickenBarns} editBarn={editBarn}/>}/>
             </Route>

             <Route path={"/contact"} element={<Contact/>} />
             <Route path={"/production"} element={<Production/>} />
             <Route path={"/climate"} element={<Clime/>}/>
         </Routes>

    </>
  )
}

export default App
