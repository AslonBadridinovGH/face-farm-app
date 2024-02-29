import './chart/App.css'
import Navbar from "./Navbar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home.tsx";
import AsideMain from "./AsideMain.tsx";
import Production from "./consume/Production.tsx";
import AddChickenBarn from "./chickenBarn/AddChickenBarn.tsx";
import FarmInfo from "./farm/FarmInfo.tsx";
import ChickenBarns from "./chickenBarn/ChickenBarnComp.tsx";
import AddNewSilo from "./silo/AddNewSilo.tsx";
import Silos from "./silo/SiloComp.tsx";
import {useEffect, useState} from "react";
import {ChBarn} from "../types/ChickenBarn.tsx";
import {Silo} from "../types/Silo.tsx";
import ViewChickenBarn from "./chickenBarn/ViewChickenBarn.tsx";
import axios from "axios";
import EditChickenBarn from "./chickenBarn/EditChickenBarn.tsx";
import EditSilo from "./silo/EditSilo.tsx";
import ViewSilo from "./silo/ViewSilo.tsx";
import {ChBarnDto} from "../types/ChickenBarnDto.tsx";
import {SiloDto} from "../types/SiloDto.tsx";
import {Chicken} from "../types/Chicken.tsx";
import Chickens from "./chicken/ChickenComp.tsx";
import AddNewChicken from "./chicken/AddNewChicken.tsx";
import ViewChicken from "./chicken/ViewChicken.tsx";
import EditChicken from "./chicken/EditChicken.tsx";
import {Feed} from "../types/Feed.tsx";
import AddNewFeed from "./feed/AddNewFeed.tsx";
import Feeds from "./feed/FeedComp.tsx";
import ViewFeed from "./feed/ViewFeed.tsx";
import EditFeed from "./feed/EditFeed.tsx";
import {Farm} from "../types/Farm.tsx";
import EditFarmInfo from "./farm/EditFarmInfo.tsx";
import Consume from "./consume/Consume.tsx";
import ConsumeBarChart from "./chart/ConsumeBarChart.tsx";
import ConsumeTable from "./consume/ConsumeTable.tsx";
import FatteningPeriod from "./fatteningPeriod/FatteningPeriodComp.tsx";
import {FatPeriod} from "../types/FatteningPeriod.tsx";
import AddFatteningPeriod from "./fatteningPeriod/AddFatteningPeriod.tsx";
import {FatPeriodDto} from "../types/FatteningPeriodDto.tsx";
import ViewFatteningPeriod from "./fatteningPeriod/ViewFatteningPeriod.tsx";
import EditFatteningPeriod from "./fatteningPeriod/EditFatteningPeriod.tsx";
import ConsumeLineChart from "./chart/ConsumeLineChart.tsx";
import ConsumePieChart from "./chart/ConsumePieChart.tsx";
import {FarmDto} from "../types/FarmDto.tsx";
import AddFarmInfo from "./farm/AddFarmInfo.tsx";
import ViewFarm from "./farm/ViewFarm.tsx";
import NoPage from "./NoPage.tsx";
import ProtectedRoutes from "./ProtectedRouts.tsx";
import Login from "./login.tsx";


function App() {

    const [chickenBarns, setChickenBars] = useState<ChBarn[]>([])

    const [fatteningsPeriods, setFatteningsPeriods] = useState<FatPeriod[]>([])

    const [silos, setSilos] = useState<Silo[]>([])

    const [chickens, setChickens] = useState<Chicken[]>([])

    const [feeds, setFeeds] = useState<Feed[]>([])

    const [farms, setFarm] = useState<Farm[]>([])

    const [user, setUser] = useState("")


    useEffect(() => {
        axios.get("/api/farm").then(response => setFarm(response.data))
    }, [])


    useEffect(() => {
        axios.get("/api/chickenBarns").then(response => setChickenBars(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/fattening").then(response => setFatteningsPeriods(response.data))
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

    const editFarmInfo = (editedFarm: Farm): void => {
        axios.put(`/api/farm/${editedFarm.id}`, editedFarm)
            .then((response) => {
                    setFarm(farms.map((item) => (item.id === editedFarm.id ? response.data : item)))
                    navigate("/farm/farmInfo/")
                }
            )
    }

    const addFarmInfo = (farmDto : FarmDto)=>{
        axios.post("/api/farm", farmDto)
            .then((response) => {
                setChickenBars([...farms, response.data])
                navigate("/farm/viewFarm/")
            })
    }


    const deleteFarm = (id: string) => {
        axios.delete(`/api/farm/${id}`)
            .then(() => {
                setFarm(farms.filter(farm => id !== farm.id));
                navigate("/farm/farmInfo")
            })
    }

    const addChickenBarn = (chickenBarnDtoToSend:ChBarnDto)=>{
        axios.post("/api/chickenBarns", chickenBarnDtoToSend)
             .then((response) => {
                 setChickenBars([...chickenBarns, response.data])
                 navigate("/farm/viewBarn/" + response.data.id)
        }).catch(reason => alert(reason.response.data.message))
    }


    const addFatPeriod = (fatPeriodDtoToSend : FatPeriodDto)=>{
        axios.post("/api/fattening", fatPeriodDtoToSend)
             .then((response) => {
                 setFatteningsPeriods([...fatteningsPeriods, response.data])
                 navigate("/production/viewFattening/" + response.data.id)
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
            }).catch(reason => alert(reason.response.data.message));
    }

    const addFeed = (feedToSave : Feed):void=>{
        axios.post("/api/feeds", feedToSave)
            .then((response) => {
                setSilos([...feeds, response.data])
                navigate("/farm/viewFeed/" + response.data.id)
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

    const editFatPeriod = (editedFatPeriod: FatPeriodDto): void => {
        axios.put(`/api/fattening/${editedFatPeriod.id}`, editedFatPeriod)
            .then((response) => {
                setFatteningsPeriods(fatteningsPeriods.map((item) => (item.id === editedFatPeriod.id ? response.data : item)))
                  navigate("/production/viewFattening/" + response.data.id)
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

    const deleteBarn = (id: string) => {
        axios.delete(`/api/chickenBarns/${id}`)
            .then(() => {
                setChickenBars(chickenBarns.filter(barn => id !== barn.id));
                navigate("/farm/chickenBarns")
            })
    }

    const deleteFatPeriod = (id: string) => {
        axios.delete(`/api/fattening/${id}`)
            .then(() => {
                setFatteningsPeriods(fatteningsPeriods.filter(period => id !== period.id));
                navigate("/production/fattenings")
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

    const login = () =>{
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')

    }

    const logout = () => {
        axios.post("/api/logout").then(()=>loadUser())
    }

    useEffect(() => {
        loadUser();
    }, []);


    function loadUser () {
        axios.get("/api/users/me")
            .then((response) => {
                setUser(response.data)
            })
    }

    return (
      <div className={"navRoot"}>
         <Navbar  log={login} userSet={user} userLoad={loadUser} outLog={logout}/>
         <Routes>
              <Route path={"/login"} element={<Login log={login}/>}/>

              <Route index element={<Home/>}/>

              <Route element={<ProtectedRoutes user={user} />}>

                  <Route path={"/farm"}  element={<AsideMain/>}>

                      <Route index element={<FarmInfo farm={farms} handleFarmDelete={deleteFarm}/>} />

                      <Route path={"farmInfo"} element={<FarmInfo farm={farms} handleFarmDelete={deleteFarm}/>}  />
                      <Route path={"farmInfo/:id/edit"} element={<EditFarmInfo farms={farms} editeFarm={editFarmInfo}/>}/>

                      <Route path={"addFarm"} element={<AddFarmInfo saveFarm = {addFarmInfo}/>}/>
                      <Route path={"viewFarm/:id"} element={<ViewFarm handleFarmDelete={deleteFarm}/>}/>

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

                  <Route path={"/production"} element={<Production/>}>

                      <Route index element={<FatteningPeriod fatteningsPeriods = {fatteningsPeriods}/>} />

                      <Route path={"consume"} element={<Consume/>}>

                          <Route index element={<ConsumeTable/>}/>
                          <Route path={"consumeBarChart"} element={<ConsumeBarChart/>}/>
                          <Route path={"consumeLineChart"} element={<ConsumeLineChart/>}/>
                          <Route path={"consumePieChart"} element={<ConsumePieChart/>}/>
                          <Route path={"consumeTable"} element={<ConsumeTable/>}/>

                      </Route>

                      <Route path={"fattenings"} element={<FatteningPeriod fatteningsPeriods = {fatteningsPeriods}/>}/>
                      <Route path={"addFattening"} element={<AddFatteningPeriod savePeriod={addFatPeriod}/>}/>
                      <Route path={"viewFattening/:id"} element={<ViewFatteningPeriod handleFatPeriodDelete={deleteFatPeriod}/>}/>
                      <Route path={"fattening/:id/edit"} element={<EditFatteningPeriod  fatteningPeriods={fatteningsPeriods} editFatPeriod={editFatPeriod}/>}/>

                  </Route>

             </Route>

              <Route path={"/*"} element={<NoPage/>}/>

         </Routes>
      </div>
  )
}

export default App
