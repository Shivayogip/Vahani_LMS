import { useState } from "react";
import axios from "axios";

import { T } from "../theme";

import Logo from "../components/Logo";
import Icon from "../components/Icon";
import Field from "../components/Field";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login({ onLogin }) {

  const [role,setRole] = useState("scholar");
  const [loading,setLoading] = useState(false);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const roles = [
    {key:"scholar",icon:"grad",label:"Scholar"},
    {key:"trainer",icon:"users",label:"Trainer"},
    {key:"admin",icon:"cog",label:"Admin"}
  ];


  const go = async () => {

  if(!email || !password){
    alert("Please enter email and password");
    return;
  }

  try{

    setLoading(true);

    // 🔹 SEND LOGIN REQUEST TO BACKEND
    const res = await axios.post(`${API_BASE}/api/auth/login`, {
      email,
      password,
      role
    });

    const data = res.data;

    console.log("Backend response:", data);

    // Save token and user info locally
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Continue login
    onLogin(data.user.role);

  }
  catch(err){

    console.error(err);
    const msg = err.response?.data?.error || err.message;
    alert("Login failed: " + msg);

  }

  setLoading(false);
};


  return (

    <div style={{display:"flex",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif"}}>

      <div style={{
        flex:1,
        background:T.navy,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        padding:60,
        position:"relative",
        overflow:"hidden"
      }}>

        <div style={{
          position:"absolute",
          top:-120,
          right:-120,
          width:400,
          height:400,
          borderRadius:"50%",
          background:`radial-gradient(circle,${T.sun}10 0%,transparent 70%)`
        }}/>

        <div style={{position:"relative",zIndex:1,maxWidth:400,textAlign:"center"}}>

          <Logo width={160} light/>

          <p style={{
            color:"rgba(255,255,255,.5)",
            fontSize:15,
            lineHeight:1.75,
            marginTop:28,
            marginBottom:44
          }}>
            Empowering scholars across India through structured learning, mentorship, and career development.
          </p>

          {[
            {icon:"trend",t:"Track progress across all programmes"},
            {icon:"book",t:"Access curated learning resources"},
            {icon:"cal",t:"Manage attendance and schedules"},
            {icon:"mail",t:"Receive automated performance reports"}
          ].map((it,i)=>(

            <div key={i}
              style={{
                display:"flex",
                alignItems:"center",
                gap:12,
                padding:"11px 16px",
                marginBottom:8,
                background:"rgba(255,255,255,.05)",
                borderRadius:11,
                border:"1px solid rgba(255,255,255,.08)",
                textAlign:"left"
              }}>

              <Icon name={it.icon} size={15} color={T.sun}/>

              <span style={{color:"rgba(255,255,255,.7)",fontSize:13}}>
                {it.t}
              </span>

            </div>

          ))}

        </div>

      </div>


      <div style={{
        flex:.85,
        background:T.chalk,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:60
      }}>

        <div style={{width:420}}>

          <div style={{marginBottom:32}}>

            <h2 style={{
              margin:0,
              fontSize:28,
              fontWeight:800,
              color:T.navy,
              fontFamily:"'Sora',sans-serif",
              letterSpacing:-.5
            }}>
              Welcome back
            </h2>

            <p style={{margin:"8px 0 0",fontSize:14,color:T.textMid}}>
              Sign in to your Vahani LMS account
            </p>

          </div>


          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:8,
            marginBottom:28,
            padding:5,
            background:T.skyXL,
            borderRadius:14
          }}>

            {roles.map(r=>(

              <button
                key={r.key}
                onClick={()=>setRole(r.key)}
                style={{
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  gap:6,
                  padding:"10px 8px",
                  borderRadius:10,
                  border:"none",
                  cursor:"pointer",
                  transition:"all .15s",
                  background:role===r.key?T.white:"transparent",
                  color:role===r.key?T.navy:T.textSub,
                  boxShadow:role===r.key?`0 2px 10px ${T.shadow}`:"none",
                  fontFamily:"'DM Sans',sans-serif"
                }}
              >

                <Icon name={r.icon} size={18} color={role===r.key?T.navy:T.textSub}/>
                <span style={{fontSize:12,fontWeight:role===r.key?700:500}}>
                  {r.label}
                </span>

              </button>

            ))}

          </div>


          <Field
            label="Email address"
            type="email"
            placeholder={`${role}@vahani.org`}
            icon="mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <Field
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />


          <div style={{textAlign:"right",marginTop:-10,marginBottom:22}}>
            <a href="#" style={{fontSize:13,color:T.navy,textDecoration:"none",fontWeight:600}}>
              Forgot password?
            </a>
          </div>


          <button
            onClick={go}
            disabled={loading}
            style={{
              width:"100%",
              padding:"13px",
              background:loading?T.sky:T.navy,
              color:T.white,
              border:"none",
              borderRadius:12,
              cursor:loading?"not-allowed":"pointer",
              fontWeight:700,
              fontSize:15,
              fontFamily:"'Sora',sans-serif",
              boxShadow:`0 4px 20px ${T.shadow}`,
              transition:"all .18s"
            }}
          >

            {loading ? "Signing in..." : "Sign In"}

          </button>


          <div style={{
            marginTop:18,
            textAlign:"center",
            fontSize:13,
            color:T.textMid
          }}>
            Need access?{" "}
            <a href="#" style={{color:T.navy,fontWeight:600,textDecoration:"none"}}>
              Contact administrator
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;