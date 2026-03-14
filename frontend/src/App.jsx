import { useState, useEffect } from "react";

import { T } from "./theme";

import FontLoader from "./components/FontLoader";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AIPanel from "./components/AIPanel";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ScholarDash from "./pages/ScholarDash";
import AdminDash from "./pages/AdminDash";
import ScholarsPage from "./pages/ScholarsPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AttendancePage from "./pages/AttendancePage";
import TrainersPage from "./pages/TrainersPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {

  const [screen,setScreen]=useState("landing");
  const [role,setRole]=useState("scholar");
  const [page,setPage]=useState("dashboard");
  const [aiOpen,setAiOpen]=useState(false);
  const [backendOk,setBackendOk]=useState(false);

  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(base+"/")
      .then(r=>setBackendOk(r.ok))
      .catch(()=>setBackendOk(false));
  },[]);

  const renderPage=()=>{
    switch(page){
      case "dashboard":
        return role==="scholar"
        ? <ScholarDash onNav={setPage}/>
        : <AdminDash onNav={setPage}/>

      case "scholars":
        return <ScholarsPage/>

      case "programmes":
        return <ProgrammesPage role={role}/>

      case "assignments":
        return <AssignmentsPage role={role}/>

      case "resources":
        return <ResourcesPage role={role}/>

      case "attendance":
        return <AttendancePage role={role}/>

      case "trainers":
        return <TrainersPage/>

      case "activities":
        return <ActivitiesPage/>

      case "reports":
        return <ReportsPage/>

      case "profile":
        return <ProfilePage role={role}/>

      default:
        return null
    }
  }

  if(screen==="landing")
    return <>
      <FontLoader/>
      <Landing onStart={()=>setScreen("login")}/>
    </>

  if(screen==="login")
    return <>
      <FontLoader/>
      <Login onLogin={(r)=>{
        setRole(r)
        setScreen("app")
        setPage("dashboard")
      }}/>
    </>

  return (
    <>
      <FontLoader/>

      <div style={{display:"flex",height:"100vh",background:T.chalk}}>

        <Sidebar
          page={page}
          setPage={setPage}
          role={role}
          onLogout={()=>setScreen("landing")}
        />

        <div style={{flex:1,display:"flex",flexDirection:"column"}}>

          <Topbar page={page} role={role} backendOk={backendOk} onNav={setPage}/>

          <div style={{flex:1,overflowY:"auto"}}>
            {renderPage()}
          </div>

        </div>

      </div>

      <button
        onClick={()=>setAiOpen(!aiOpen)}
        style={{
          position:"fixed",
          bottom:24,
          right:24,
          width:52,
          height:52,
          borderRadius:"50%",
          background:T.navy,
          border:"none"
        }}
      >
        AI
      </button>

      {aiOpen && <AIPanel onClose={()=>setAiOpen(false)}/>}

    </>
  )
}