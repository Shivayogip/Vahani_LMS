import { useState, useEffect } from "react";

import { T } from "../theme";
import { apiFetch } from "../api";

import SH from "../components/SH";
import Card from "../components/Card";
import Icon from "../components/Icon";
import Av from "../components/Av";
import Bar from "../components/Bar";
import Kpi from "../components/Kpi";


function ReportsPage() {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending,setSending]=useState(false); const [sent,setSent]=useState(false);
  const [rtype,setRtype]=useState("performance");
  const [recs,setRecs]=useState(["scholars","trainers"]);
  const [freq,setFreq]=useState("one-time");

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const data = await apiFetch("/api/users/scholars");
        setScholars(data);
      } catch (error) {
        console.error("Error fetching scholars for reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholars();
  }, []);

  const toggle=r=>setRecs(p=>p.includes(r)?p.filter(x=>x!==r):[...p,r]);
  const doSend=async()=>{
    setSending(true); await new Promise(r=>setTimeout(r,2200));
    setSending(false); setSent(true); setTimeout(()=>setSent(false),3000);
  };

  if (loading) return <div style={{ padding: 32 }}>Loading reports...</div>;

  return (
    <div style={{padding:32}}>
      <SH title="Reports & Analytics" sub="Generate and distribute performance reports"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:24}}>
        <Card>
          <h3 style={{margin:"0 0 22px",fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif",
            display:"flex",alignItems:"center",gap:8}}>
            <Icon name="mail" size={16} color={T.navy}/> Generate & Email Report
          </h3>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:.8,
              marginBottom:10,fontFamily:"'Sora',sans-serif"}}>Report Type</div>
            {[["performance","Performance Report"],["attendance","Attendance Report"],
              ["progress","Programme Progress"],["full","Full Scholar Report"]].map(([v,l])=>(
              <label key={v} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,
                marginBottom:5,cursor:"pointer",transition:"background .12s",
                background:rtype===v?`${T.navy}07`:"transparent",border:`1px solid ${rtype===v?T.border:"transparent"}`}}>
                <input type="radio" name="rtype" value={v} checked={rtype===v} onChange={()=>setRtype(v)} style={{accentColor:T.navy}}/>
                <span style={{fontSize:13,color:T.text,fontWeight:rtype===v?600:400}}>{l}</span>
              </label>
            ))}
          </div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:.8,
              marginBottom:10,fontFamily:"'Sora',sans-serif"}}>Send To</div>
            {[["scholars","Scholars"],["trainers","Trainers"],["programme_heads","Programme Heads"],["leadership","Leadership Team"]].map(([v,l])=>(
              <label key={v} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,
                marginBottom:5,cursor:"pointer",background:recs.includes(v)?`${T.navy}07`:"transparent",
                border:`1px solid ${recs.includes(v)?T.border:"transparent"}`}}>
                <input type="checkbox" checked={recs.includes(v)} onChange={()=>toggle(v)} style={{accentColor:T.navy}}/>
                <span style={{fontSize:13,color:T.text,fontWeight:recs.includes(v)?600:400}}>{l}</span>
              </label>
            ))}
          </div>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:.8,
              marginBottom:10,fontFamily:"'Sora',sans-serif"}}>Schedule</div>
            <div style={{display:"flex",gap:8}}>
              {[["one-time","One-time"],["weekly","Weekly"],["monthly","Monthly"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFreq(v)} style={{flex:1,padding:"8px 0",borderRadius:8,
                  border:`1.5px solid ${freq===v?T.navy:T.border}`,cursor:"pointer",
                  background:freq===v?T.navy:T.white,color:freq===v?T.white:T.textMid,
                  fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all .14s"}}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={doSend} disabled={sending} style={{width:"100%",padding:"13px",
            background:sent?T.success:T.navy,color:T.white,border:"none",borderRadius:12,
            cursor:sending?"not-allowed":"pointer",fontWeight:700,fontSize:14,fontFamily:"'Sora',sans-serif",
            display:"flex",alignItems:"center",justifyContent:"center",gap:9,
            boxShadow:`0 4px 16px ${T.shadow}`,transition:"all .2s"}}>
            {sending?<>Sending report...</>:sent?<><Icon name="check" size={16} color={T.white}/> Report Sent!</>:<><Icon name="send" size={15} color={T.white}/> Send Report Now</>}
          </button>
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <Card>
            <h3 style={{margin:"0 0 18px",fontSize:15,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif",
              display:"flex",alignItems:"center",gap:8}}>
              <Icon name="trend" size={15} color={T.navy}/> Scholar Performance
            </h3>
            {scholars.slice(0, 6).map(s=>(
              <div key={s._id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <Av name={s.name} size={30} color={T.navy}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:13,fontWeight:600,color:T.text}}>{s.name}</span>
                    <span style={{fontSize:12,fontWeight:700,color:s.score>=80?T.success:s.score>=60?T.warn:T.danger}}>{s.score}</span>
                  </div>
                  <Bar pct={s.score} color={s.score>=80?T.success:s.score>=60?T.sun:T.danger} h={5}/>
                </div>
              </div>
            ))}
          </Card>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            <Kpi icon="grad"    label="Reports Sent" value="24"  accent={T.navy}/>
            <Kpi icon="scholars" label="Recipients"  value={scholars.length} accent={T.success}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage; 