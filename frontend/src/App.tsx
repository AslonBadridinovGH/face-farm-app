import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home.tsx";
import AsideMain from "./components/AsideMain.tsx";
import Contact from "./components/nextComp/contact.tsx";
import Production from "./components/nextComp/production.tsx";
import Clime from "./components/nextComp/clime.tsx";
import AddChickenBarn from "./components/chickenBarn/AddChickenBarn.tsx";
import FarmInfo from "./components/farm/FarmInfo.tsx";
import ChickenBarns from "./components/chickenBarn/ChickenBarnComp.tsx";
import AddNewSilo from "./components/silo/AddNewSilo.tsx";
import Silos from "./components/silo/SiloComp.tsx";
import {useEffect, useState} from "react";
import {ChBarn} from "./types/ChickenBarn.tsx";
import {Silo} from "./types/Silo.tsx";
import ViewChickenBarn from "./components/chickenBarn/ViewChickenBarn.tsx";
import axios from "axios";
import EditChickenBarn from "./components/chickenBarn/EditChickenBarn.tsx";
import EditSilo from "./components/silo/EditSilo.tsx";
import ViewSilo from "./components/silo/ViewSilo.tsx";
import {ChBarnDto} from "./types/ChickenBarnDto.tsx";
import {SiloDto} from "./types/SiloDto.tsx";
import {Chicken} from "./types/Chicken.tsx";
import Chickens from "./components/chicken/ChickenComp.tsx";
import AddNewChicken from "./components/chicken/AddNewChicken.tsx";
import ViewChicken from "./components/chicken/ViewChicken.tsx";
import EditChicken from "./components/chicken/EditChicken.tsx";
import {Feed} from "./types/Feed.tsx";
import AddNewFeed from "./components/feed/AddNewFeed.tsx";
import Feeds from "./components/feed/FeedComp.tsx";
import ViewFeed from "./components/feed/ViewFeed.tsx";
import EditFeed from "./components/feed/EditFeed.tsx";
import {Farm} from "./types/Farm.tsx";
import {FarmDto} from "./types/FarmDto.tsx";
import AddFarmInfo from "./components/farm/AddFarmInfo.tsx";
import ViewFarm from "./components/farm/ViewFarm.tsx";
import EditFarmInfo from "./components/farm/EditFarmInfo.tsx";



function App() {

    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])

    const [silos, setSilos] = useState<Silo[]>([])

    const [chickens, setChickens] = useState<Chicken[]>([])

    const [feeds, setFeeds] = useState<Feed[]>([])

    const [farms, setFarm] = useState<Farm[]>([])

    useEffect(() => {
        axios.get("/api/farm").then(response => setFarm(response.data))
    }, [])


    useEffect(() => {
        axios.get("/api/chickenBarns").then(response => setChickenBars(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/silos").then(response => setSilos(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/chickens").then(response => setChickens(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/feeds").then(response => setFeeds(response.data))
    }, [])


    const navigate = useNavigate()

    const addFarmInfo = (farmDto : FarmDto)=>{
        axios.post("/api/farm", farmDto)
             .then((response) => {
                 setChickenBars([...farms, response.data])
                 navigate("/farm/viewFarm/" + response.data.id)
        })
    }

    const addChickenBarn = (chickenBarnDtoToSend:ChBarnDto)=>{
        axios.post("/api/chickenBarns", chickenBarnDtoToSend)
             .then((response) => {
                 setChickenBars([...chickenBarns, response.data])
                 navigate("/farm/viewBarn/" + response.data.id)
        })
    }

    const addChicken = (chickenToSave : Chicken)=>{
        axios.post("/api/chickens", chickenToSave)
             .then((response) => {
                 setChickens([...chickens, response.data])
                 navigate("/farm/viewChicken/" + response.data.id)
        })
    }

    const addSilo = (siloToSave : SiloDto):void=>{
        axios.post("/api/silos", siloToSave)
            .then((response) => {
                setSilos([...silos, response.data])
                navigate("/farm/viewSilo/" + response.data.id)
            })
    }

    const addFeed = (feedToSave : Feed):void=>{
        axios.post("/api/feeds", feedToSave)
            .then((response) => {
                setSilos([...feeds, response.data])
                navigate("/farm/viewFeed/" + response.data.id)
            })
    }

    const editFarmInfo = (editedFarm: Farm): void => {
        console.log(editedFarm.id);
        axios.put(`/api/farm/${editedFarm.id}`, editedFarm)
            .then((response) => {
                setFarm(farms.map((item) => (item.id === editedFarm.id ? response.data : item)))
                 console.log(response.data.id);

                  navigate("/farm/viewFarm/" + response.data.id)
                }
            )
    }

    const editBarn = (editedChickenBarn: ChBarnDto): void => {
        axios.put(`/api/chickenBarns/${editedChickenBarn.id}`, editedChickenBarn)
            .then((response) => {
                setChickenBars(chickenBarns.map((item) => (item.id === editedChickenBarn.id ? response.data : item)))
                  navigate("/farm/viewBarn/" + response.data.id)
                }
            )
    }

    const editSilo = (silo: SiloDto): void => {
        axios.put(`/api/silos/${silo.id}`, silo)
            .then(response => {
                    setSilos(silos.map((item) => (item.id === silo.id ? response.data : item)))
                    navigate("/farm/viewSilo/" + response.data.id)
                }
            )
    }

    const editFeed = (feed: Feed): void => {
        axios.put(`/api/feeds/${feed?.id}`, feed)
            .then(response => {
                    setFeeds(feeds.map((item) => (item.id === feed.id ? response.data : item)))
                    navigate("/farm/viewFeed/" + response.data.id)
                }
            )
    }

    const editChicken = (chicken: Chicken): void => {
        axios.put(`/api/chickens/${chicken.id}`, chicken)
            .then(response => {
                    setChickens(chickens.map((item) => (item.id === chicken.id ? response.data : item)))
                    navigate("/farm/viewChicken/" + response.data.id)
                }
            )
    }

    const deleteFarm = (id: string) => {
        axios.delete(`/api/farm/${id}`)
            .then(() => {
                setFarm(farms.filter(farm => id !== farm.id));
                navigate("/farm/farmInfo")
            })
    }


    const deleteBarn = (id: string) => {
        axios.delete(`/api/chickenBarns/${id}`)
            .then(() => {
                setChickenBars(chickenBarns.filter(barn => id !== barn.id));
                navigate("/farm/chickenBarns")
            })
    }

    const deleteChicken = (id: string) => {
        axios.delete(`/api/chickens/${id}`)
            .then(() => {
                setChickens(chickens.filter(chicken => id !== chicken.id));
                navigate("/farm/chickens")
            })
    }

    const deleteSilo = (id: string) => {
        axios.delete(`/api/silos/${id}`)
            .then(() => {
                setSilos([...silos.filter(silo => id !== silo.id)]);
                navigate("/farm/silos")
            })
    }

    const deleteFeed = (id: string) => {
        axios.delete(`/api/feeds/${id}`)
            .then(() => {
                setFeeds([...feeds.filter(feed => id !== feed.id)]);
                navigate("/farm/feeds")
            })
    }


    return (
    <>
         <Navbar/>
         <Routes>
             <Route index element={<Home/>}/>

             <Route path={"/farm"}  element={<AsideMain/>}>

                 <Route index element={<p>Farm ...</p>}/>

                 <Route path={"farmInfo"} element={<FarmInfo farm={farms}/>}  />
                 <Route path={"addFarm"} element={<AddFarmInfo saveFarm = {addFarmInfo}/>}/>
                 <Route path={"viewFarm/:id"} element={<ViewFarm handleFarmDelete={deleteFarm}/>}/>
                 <Route path={"farmInfo/:id/edit"} element={<EditFarmInfo farms={farms} editeFarm={editFarmInfo}/>}/>

                 <Route path={"chickenBarns"} element={<ChickenBarns chickenBarns = {chickenBarns}/>}/>
                 <Route path={"addNewBarn"} element={<AddChickenBarn saveBarn = {addChickenBarn} />}/>
                 <Route path={"viewBarn/:id"} element={<ViewChickenBarn handleBarnDelete={deleteBarn}/>}/>
                 <Route path={"chickenBarn/:id/edit"} element={<EditChickenBarn chickenBarns={chickenBarns} editBarn={editBarn}/>}/>

                 <Route path={"chickens"} element={<Chickens chickens = {chickens}/>}/>
                 <Route path={"addChicken"} element={<AddNewChicken saveChicken = {addChicken} />}/>
                 <Route path={"viewChicken/:id"} element={<ViewChicken handleChickenDelete={deleteChicken}/>}/>
                 <Route path={"chicken/:id/edit"} element={<EditChicken chickens={chickens} editChicken={editChicken}/>}/>

                 <Route path={"feeds"} element={<Feeds feeds = {feeds}/>}/>
                 <Route path={"addFeed"} element={<AddNewFeed saveFeed = {addFeed} />}/>
                 <Route path={"viewFeed/:id"} element={<ViewFeed handleFeedDelete={deleteFeed}/>}/>
                 <Route path={"feed/:id/edit"} element={<EditFeed feeds={feeds} editFeed={editFeed}/>}/>

                 <Route path={"silos"} element={<Silos silos={silos}/>}  />
                 <Route path={"addSilo"} element={<AddNewSilo saveSilo = {addSilo}/>}/>
                 <Route path={"viewSilo/:id"} element={<ViewSilo handleSiloDelete={deleteSilo}/>}/>
                 <Route path={"silo/:id/edit"} element={<EditSilo silos={silos} editSilo={editSilo}/>}/>

             </Route>

             <Route path={"/contact"} element={<Contact/>} />
             <Route path={"/production"} element={<Production/>} />
             <Route path={"/climate"} element={<Clime/>}/>
         </Routes>

    </>
  )
}

export default App
