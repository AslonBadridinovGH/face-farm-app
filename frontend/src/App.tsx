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
import {useEffect, useState} from "react";
import {ChBarn} from "./types/ChickenBarn.tsx";
import {Silo} from "./types/Silo.tsx";
import ViewBarn from "./components/ViewBarn.tsx";
import axios from "axios";
import EditChickenBarn from "./components/EditChickenBarn.tsx";
import EditSilo from "./components/EditSilo.tsx";
import ViewSilo from "./components/ViewSilo.tsx";
import {ChBarnDto} from "./types/ChickenBarnDto.tsx";


function App() {


    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])

    const [silos, setSilos] = useState<Silo[]>([])

    useEffect(() => {
        axios.get("/api/chickenBarns").then(response => setChickenBars(response.data))
    }, [])


    const navigate = useNavigate()

    const addChickenBarn = (chickenBarnDtoToSend:ChBarnDto)=>{

        axios.post("/api/chickenBarns", chickenBarnDtoToSend)
             .then((response) => {
                 setChickenBars([...chickenBarns, response.data])
                 navigate("/farm/viewBarn/" + response.data.id)
        })
    }

    const editBarn = (editedChickenBarn: ChBarnDto): void => {
        axios.put(`/api/chickenBarns/${editedChickenBarn.id}`, editedChickenBarn)
            .then((response) => {
                setChickenBars(chickenBarns.map((item) => (item.id === editedChickenBarn.id ? response.data : item)))
                  navigate("/farm/viewBarn/" + response.data.id)
                }
            )
    }

    const deleteBarn = (id: string) => {
        axios.delete(`/api/chickenBarns/${id}`)
            .then(() => {
                setChickenBars(chickenBarns.filter(barn => id !== barn.id));
                navigate("/farm/chickenBarns")
            })
    }

    const addSilo = (siloToSave : Silo):void=>{
        setSilos([...silos, siloToSave])
    }

    const deleteSilo = (id: string) => {
        axios.delete(`/api/silos/${id}`)
            .then(() => {
                setSilos([...silos.filter(silo => id !== silo.id)]);
                navigate("/farm/silos")
            })
    }

    const editSilo = (silo: Silo): void => {
        axios.put(`/api/silos/${silo.id}`, silo)
            .then(response => {
                    setSilos(silos.map((item) => (item.id === silo.id ? response.data : item)))
                    navigate("/farm/silos/" + response.data.id)
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
                 <Route path={"viewBarn/:id"} element={<ViewBarn handleBarnDelete={deleteBarn}/>}/>
                 <Route path={"chickenBarn/:id/edit"} element={<EditChickenBarn chickenBarns={chickenBarns} editBarn={editBarn}/>}/>

                 <Route path={"silos"} element={<Silos silos={silos}/>}  />
                 <Route path={"addSilo"} element={<AddNewSilo saveSilo = {addSilo}/>}/>
                 <Route path={"viewSilo/:id"} element={<ViewSilo handleSiloDelete={deleteSilo}/>}/>
                 <Route path={"silos/:id/edit"} element={<EditSilo silos={silos} editSilo={editSilo}/>}/>
             </Route>

             <Route path={"/contact"} element={<Contact/>} />
             <Route path={"/production"} element={<Production/>} />
             <Route path={"/climate"} element={<Clime/>}/>
         </Routes>

    </>
  )
}

export default App
