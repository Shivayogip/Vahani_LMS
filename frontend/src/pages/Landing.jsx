import { useState, useEffect } from "react";

import { T } from "../theme";

import Logo from "../components/Logo";
import Icon from "../components/Icon";
import backgroundImage from "../assets/DSC02520.jpg";


function Landing({ onStart }) {
  const [vis,setVis]=useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setVis(true),80); return()=>clearTimeout(t); },[]);
  return (
    <div style={{minHeight:"100vh",background:T.navyD,fontFamily:"'DM Sans',sans-serif",overflowX:"hidden",
      backgroundImage:`url(${backgroundImage})`,backgroundSize:"cover",backgroundPosition:"center",
      backgroundAttachment:"fixed",position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.65)",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1}}>
      <nav style={{position:"relative",zIndex:10,display:"flex",justifyContent:"space-between",
        alignItems:"center",padding:"24px 64px",borderBottom:"1px solid rgba(255,255,255,.06)",background:T.navyD}}>
        <Logo width={140} light/>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onStart} style={{padding:"10px 28px",background:"transparent",
            border:"1.5px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.8)",borderRadius:10,
            cursor:"pointer",fontSize:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.5)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.2)";e.currentTarget.style.color="rgba(255,255,255,.8)";}}>
            Sign in
          </button>
          <button onClick={onStart} style={{padding:"10px 28px",background:T.sun,color:T.navyD,border:"none",
            borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif",
            boxShadow:`0 4px 20px ${T.sun}40`}}>Get Started</button>
        </div>
      </nav>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",padding:"88px 40px 64px",
        textAlign:"center",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all .9s cubic-bezier(.4,0,.2,1)"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 16px",
          background:"rgba(245,200,66,.1)",border:"1px solid rgba(245,200,66,.25)",borderRadius:999,marginBottom:28}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:T.sun}}/>
          <span style={{color:T.sun,fontSize:12,fontWeight:600,letterSpacing:1.2,textTransform:"uppercase"}}>
            Scholarship Learning Management System
          </span>
        </div>
        <h1 style={{margin:"0 0 24px",fontSize:64,fontWeight:800,lineHeight:1.06,
          letterSpacing:-1.8,fontFamily:"'Sora',sans-serif",color:T.white}}>
          Where Vahani<br/><span style={{color:T.sun}}>Scholars</span> Thrive
        </h1>
        <p style={{fontSize:18,color:"rgba(255,255,255,.55)",lineHeight:1.8,maxWidth:560,
          margin:"0 auto 44px",fontWeight:400}}>
          A unified platform for mandatory programmes, mentorship, resources,
          and automated analytics — purpose-built for the Vahani community.
        </p>
        <button onClick={onStart} style={{display:"inline-flex",alignItems:"center",gap:10,
          padding:"14px 40px",background:T.sun,color:T.navyD,border:"none",borderRadius:12,
          cursor:"pointer",fontWeight:700,fontSize:15,fontFamily:"'Sora',sans-serif",
          boxShadow:`0 8px 32px ${T.sun}44`}}>
          Access Portal <Icon name="arrowR" size={16} color={T.navyD}/>
        </button>
      </div>
      <div style={{position:"relative",zIndex:2,maxWidth:860,margin:"0 auto 0",
        background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",
        borderRadius:20,padding:"24px 0",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
        {[["208","Active Scholars"],["6","Active programmes"],["74%","Avg completion"],["4.8","Trainer rating"]].map(([n,l],i)=>(
          <div key={i} style={{textAlign:"center",padding:"0 24px",
            borderRight:i<3?"1px solid rgba(255,255,255,.08)":"none"}}>
            <div style={{fontSize:32,fontWeight:800,color:T.sun,fontFamily:"'Sora',sans-serif",letterSpacing:-1}}>{n}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{position:"relative",zIndex:2,maxWidth:940,margin:"72px auto 0",padding:"0 40px"}}>
        <h2 style={{textAlign:"center",margin:"0 0 40px",fontSize:34,fontWeight:800,color:T.white,
          fontFamily:"'Sora',sans-serif",letterSpacing:-.5}}>Everything in one platform</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}}>
          {[
            {icon:"trend",  title:"Progress Analytics",    desc:"Real-time performance tracking across assignments, quizzes, and attendance"},
            {icon:"book",   title:"Resource Library",       desc:"Programme-wise videos, documents, and notes — always organized"},
            {icon:"mail",   title:"Automated Reports",      desc:"Schedule and email reports to scholars, trainers, and leadership"},
            {icon:"bot",    title:"AI Learning Assistant",  desc:"Instant 24/7 academic support powered by Claude"},
          ].map((f,i)=>(
            <div key={i} style={{padding:"28px",background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.08)",borderRadius:20,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.borderColor="rgba(245,200,66,.22)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}>
              <div style={{width:44,height:44,borderRadius:12,background:`${T.sun}16`,border:`1.5px solid ${T.sun}28`,
                display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                <Icon name={f.icon} size={20} color={T.sun}/>
              </div>
              <h3 style={{margin:"0 0 8px",fontSize:16,fontWeight:700,color:T.white,fontFamily:"'Sora',sans-serif"}}>{f.title}</h3>
              <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"relative",zIndex:2,textAlign:"center",padding:"60px 0 40px",
        color:"rgba(255,255,255,.2)",fontSize:13}}>
        &copy; 2026 Vahani Scholarship Trust. All rights reserved.
      </div>
      </div>
    </div>
  );
}

export default Landing;