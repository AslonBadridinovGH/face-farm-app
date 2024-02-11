import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home.tsx";
import Aside_main from "./components/aside_main.tsx";
import Contact from "./components/nextComp/contact.tsx";
import Production from "./components/nextComp/production.tsx";
import Clime from "./components/nextComp/clime.tsx";
import AddNewFarm from "./components/addNewFarm.tsx";
import AddNewBarn from "./components/addNewBarn.tsx";
import FarmInfo from "./components/farmInfo.tsx";
import ChickenBarn from "./components/chicken_barn.tsx";
import AddNewSilo from "./components/AddNewSilo.tsx";
import Silo from "./components/silo.tsx";


function App() {

  return (
    <>
         <Navbar/>
         <Routes>
             <Route index element={<Home/>}/>

             <Route path={"/farm"}  element={<Aside_main/>}>
                 <Route index element={<p>Farm ...</p>}/>
                 <Route path={"farmInfo"}  element={<FarmInfo/>}/>
                 <Route path={"addFarm"} element={<AddNewFarm/>}/>
                 <Route path={"chickenBarn"} element={<ChickenBarn/>}/>
                 <Route path={"addNewBarn"} element={<AddNewBarn/>}/>
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
