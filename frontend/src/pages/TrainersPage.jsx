import { useState, useEffect } from "react";
import { T } from "../theme";
import { apiFetch } from "../api";

import SH from "../components/SH";
import Card from "../components/Card";
import Av from "../components/Av";
import Icon from "../components/Icon";


function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await apiFetch("/api/users/trainers");
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  if (loading) return <div style={{padding:32}}>Loading trainers...</div>;

  return (
    <div style={{padding:32}}>
      <SH title="Trainers & Tutors" sub="Manage trainer and tutor profiles" onAction={()=>{}} actionIcon="plus" actionLabel="Add Trainer"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
        {trainers.map(t=>(
          <Card key={t._id || t.id}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
              <Av name={t.name} size={52} color={T.navy}/>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{t.name}</div>
                <div style={{fontSize:13,color:T.navyL,fontWeight:600,marginTop:2}}>{t.subject}</div>
                <div style={{fontSize:12,color:T.textSub,marginTop:2,display:"flex",alignItems:"center",gap:4}}>
                  <Icon name="mail" size={11} color={T.textSub}/>{t.email}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,
                padding:"8px 12px",background:T.warnBg,borderRadius:10,border:`1px solid #F5D060`}}>
                <Icon name="star" size={14} color={T.sunD}/>
                <span style={{fontSize:14,fontWeight:800,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{t.rating}</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
              {[["Scholars",t.scholars],["Sessions",t.sessions],["Joined",t.joined]].map(([lb,vl],i)=>(
                <div key={i} style={{background:T.chalk,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:i<2?18:12,fontWeight:i<2?800:600,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{vl}</div>
                  <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{flex:1,padding:"9px",background:T.navy,color:T.white,border:"none",borderRadius:9,
                cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",
                display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <Icon name="eye" size={13} color={T.white}/> View Profile
              </button>
              <button style={{flex:1,padding:"9px",background:"transparent",color:T.navy,
                border:`1.5px solid ${T.border}`,borderRadius:9,cursor:"pointer",fontSize:13,
                fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <Icon name="mail" size={13} color={T.navy}/> Message
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TrainersPage;