import { useState } from "react";
import { T } from "../theme";
import { PROGRAMMES } from "../data/data";

import SH from "../components/SH";
import Pill from "../components/Pill";
import Icon from "../components/Icon";
import Bar from "../components/Bar";
import ProgrammeDetail from "./ProgrammeDetail";


function ProgrammesPage({ role }) {
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(null);

  if (selectedProgrammeId) {
    return <ProgrammeDetail programmeId={selectedProgrammeId} onBack={() => setSelectedProgrammeId(null)} />;
  }
  return (
    <div style={{padding:32}}>
      <SH title="Programmes" sub="All active learning programmes" onAction={role!=="scholar"?()=>{}:null} actionIcon="plus" actionLabel="New Programme"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {PROGRAMMES.map(p=>(
          <div key={p.id} style={{background:T.white,borderRadius:20,border:`1px solid ${T.border}`,overflow:"hidden",
            boxShadow:`0 2px 12px ${T.shadow}`,transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 40px ${T.shadowMd}`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 2px 12px ${T.shadow}`;}}>
            <div style={{height:5,background:p.color}}/>
            <div style={{padding:22}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <h3 style={{margin:0,fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif",lineHeight:1.35,maxWidth:"70%"}}>{p.name}</h3>
                <Pill label={`${p.completion}%`} v="navy" xs/>
              </div>
              <div style={{fontSize:12,color:T.textMid,marginBottom:14,display:"flex",alignItems:"center",gap:5}}>
                <Icon name="users" size={12} color={T.textSub}/>{p.trainer}
              </div>
              <div style={{marginBottom:14}}><Bar pct={p.completion} color={p.color} h={6}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:T.chalk,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:800,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{p.enrolled}</div>
                  <div style={{fontSize:11,color:T.textSub}}>Enrolled</div>
                </div>
                <div style={{background:T.chalk,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:800,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{p.resources}</div>
                  <div style={{fontSize:11,color:T.textSub}}>Resources</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={() => setSelectedProgrammeId(p.id)} style={{flex:1,padding:"8px",background:p.color,color:T.white,border:"none",borderRadius:8,
                  cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                  <Icon name="arrowR" size={12} color={T.white}/> Open
                </button>
                {role!=="scholar"&&<button style={{padding:"8px 12px",background:"transparent",color:T.textMid,
                  border:`1px solid ${T.border}`,borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",
                  display:"flex",alignItems:"center",gap:4}}>
                  <Icon name="cog" size={12} color={T.textMid}/> Manage
                </button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgrammesPage;