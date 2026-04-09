import { useState, useEffect } from "react";
import { apiFetch } from "../api";

import { T } from "../theme";

import Av from "../components/Av";
import Icon from "../components/Icon";
import Bar from "../components/Bar";
import Pill from "../components/Pill";
import SH from "../components/SH";
import DataTable from "../components/DataTable";

function ScholarsPage() {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState(""); 
  const [filter,setFilter]=useState("All");

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const data = await apiFetch("/api/users/scholars");
        setScholars(data);
      } catch (error) {
        console.error("Error fetching scholars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholars();
  }, []);

  if (loading) return <div style={{padding:32}}>Loading scholars...</div>;

  const f=scholars.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())&&(filter==="All"||s.status===filter));
  const rows=f.map(s=>[
    <div key={s._id} style={{display:"flex",alignItems:"center",gap:10}}>
      <Av name={s.name} size={32} color={T.navy}/>
      <div><div style={{fontWeight:600,color:T.navy,fontSize:13}}>{s.name}</div>
        <div style={{fontSize:11,color:T.textSub}}>{s.email}</div></div>
    </div>,
    <span style={{fontSize:13,color:T.textMid}}>{s.programme}</span>,
    <Pill label={`${s.year} Year`} v="sky" xs/>,
    <div><span style={{fontSize:13,fontWeight:700,color:s.attendance<80?T.danger:T.success}}>{s.attendance}%</span>
      <Bar pct={s.attendance} color={s.attendance<80?T.danger:T.success} h={3}/></div>,
    <span style={{fontSize:13,fontWeight:700,color:s.score<70?T.warn:T.success}}>{s.score}<span style={{color:T.textSub,fontWeight:400}}>/100</span></span>,
    <Pill label={s.status} v={s.status==="Active"?"success":"danger"}/>,
    <button style={{padding:"6px 14px",background:T.navy,color:T.white,border:"none",borderRadius:7,cursor:"pointer",
      fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:4}}>
      <Icon name="eye" size={12} color={T.white}/> View
    </button>
  ]);
  return (
    <div style={{padding:32}}>
      <SH title="Scholars" sub={`${scholars.length} total scholars enrolled`} onAction={()=>{}} actionIcon="plus" actionLabel="Add Scholar"/>
      <div style={{display:"flex",gap:12,marginBottom:24}}>
        <div style={{flex:1,position:"relative"}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>
            <Icon name="search" size={14} color={T.textSub}/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or programme..."
            style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:10,border:`1.5px solid ${T.border}`,
              fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box",transition:"border-color .15s"}}
            onFocus={e=>e.target.style.borderColor=T.navy} onBlur={e=>e.target.style.borderColor=T.border}/>
        </div>
        {["All","Active","At Risk"].map(v=>(
          <button key={v} onClick={()=>setFilter(v)} style={{padding:"10px 18px",borderRadius:10,
            border:`1.5px solid ${filter===v?T.navy:T.border}`,cursor:"pointer",
            background:filter===v?T.navy:T.white,color:filter===v?T.white:T.textMid,
            fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s"}}>{v}</button>
        ))}
      </div>
      <DataTable cols={["Scholar","Programme","Year","Attendance","Score","Status","Actions"]} rows={rows}/>
    </div>
  );
}

export default ScholarsPage;