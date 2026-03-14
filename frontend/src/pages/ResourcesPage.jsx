import { useState } from "react";

import { T } from "../theme";
import { RESOURCES } from "../data/data";

import SH from "../components/SH";
import Card from "../components/Card";
import Icon from "../components/Icon";
import Pill from "../components/Pill";


function ResourcesPage({ role }) {
  const TM={Video:{icon:"video",color:"#5B35B0"},Document:{icon:"doc",color:T.navy},Notes:{icon:"pencil",color:T.success}};
  const [typeFilter,setTypeFilter]=useState("All");
  const [programmeFilter,setProgrammeFilter]=useState("All");
  const [dateFilter,setDateFilter]=useState("All");
  
  const programmes=["All",...new Set(RESOURCES.map(r=>r.programme))];
  
  const getDateCategory=(dateStr)=>{
    const date=new Date(dateStr);
    const today=new Date();
    const diffTime=today-date;
    const diffDays=diffTime/(1000*60*60*24);
    if(diffDays<=7)return"Last Week";
    if(diffDays<=30)return"Last Month";
    return"Older";
  };
  
  const filtered=RESOURCES.filter(r=>{
    const typeMatch=typeFilter==="All"||r.type===typeFilter;
    const progMatch=programmeFilter==="All"||r.programme===programmeFilter;
    const dateCategory=getDateCategory(r.date);
    const dateMatch=dateFilter==="All"||dateCategory===dateFilter;
    return typeMatch&&progMatch&&dateMatch;
  });
  return (
    <div style={{padding:32}}>
      <SH title="Learning Resources" sub="Programme-wise videos, documents, and notes"
        onAction={role!=="scholar"?()=>{}:null} actionIcon="upload" actionLabel="Upload"/>
      
      <div style={{marginBottom:24}}>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.navy,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Resource Type</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["All","Video","Document","Notes"].map(f=>(
              <button key={f} onClick={()=>setTypeFilter(f)} style={{padding:"8px 18px",borderRadius:9,
                border:`1.5px solid ${typeFilter===f?T.navy:T.border}`,cursor:"pointer",
                background:typeFilter===f?T.navy:T.white,color:typeFilter===f?T.white:T.textMid,
                fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s"}}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.navy,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Programmes</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {programmes.map(p=>(
              <button key={p} onClick={()=>setProgrammeFilter(p)} style={{padding:"8px 18px",borderRadius:9,
                border:`1.5px solid ${programmeFilter===p?T.navy:T.border}`,cursor:"pointer",
                background:programmeFilter===p?T.navy:T.white,color:programmeFilter===p?T.white:T.textMid,
                fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s",maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={{fontSize:12,fontWeight:700,color:T.navy,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Date Created</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["All","Last Week","Last Month","Older"].map(d=>(
              <button key={d} onClick={()=>setDateFilter(d)} style={{padding:"8px 18px",borderRadius:9,
                border:`1.5px solid ${dateFilter===d?T.navy:T.border}`,cursor:"pointer",
                background:dateFilter===d?T.navy:T.white,color:dateFilter===d?T.white:T.textMid,
                fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s"}}>{d}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {filtered.map(r=>{
          const tm=TM[r.type];
          return (
            <Card key={r.id} style={{transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 12px 40px ${T.shadowMd}`}
              onMouseLeave={e=>e.currentTarget.style.boxShadow=`0 2px 12px ${T.shadow}`}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{width:46,height:46,borderRadius:12,background:`${tm.color}10`,border:`1.5px solid ${tm.color}20`,
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Icon name={tm.icon} size={20} color={tm.color}/>
                </div>
                <Pill label={r.type} v={r.type==="Video"?"sky":r.type==="Document"?"navy":"success"} xs/>
              </div>
              <div style={{fontSize:14,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif",marginBottom:5,lineHeight:1.3}}>{r.title}</div>
              <div style={{fontSize:12,color:T.textMid,marginBottom:3}}>{r.programme}</div>
              <div style={{fontSize:11,color:T.textSub}}>{r.size} · {r.date}</div>
              <button style={{marginTop:16,width:"100%",padding:"9px",background:T.chalk,color:T.navy,
                border:`1.5px solid ${T.border}`,borderRadius:9,cursor:"pointer",fontWeight:600,fontSize:13,
                fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all .14s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=T.navy;e.currentTarget.style.color=T.white;e.currentTarget.style.borderColor=T.navy;}}
                onMouseLeave={e=>{e.currentTarget.style.background=T.chalk;e.currentTarget.style.color=T.navy;e.currentTarget.style.borderColor=T.border;}}>
                {r.type==="Video"?<><Icon name="video" size={13} color="currentColor"/> Watch</>:<><Icon name="doc" size={13} color="currentColor"/> Download</>}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ResourcesPage;