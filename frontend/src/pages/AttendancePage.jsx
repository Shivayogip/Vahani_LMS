import { T } from "../theme";
import { SCHOLARS } from "../data/data";

import SH from "../components/SH";
import Card from "../components/Card";
import Bar from "../components/Bar";
import Pill from "../components/Pill";
import Icon from "../components/Icon";
import Kpi from "../components/Kpi";
import DataTable from "../components/DataTable";
import Av from "../components/Av";


function AttendancePage({ role }) {

  const sessions = [
    { name: "Communication Skills", date: "10 Mar 2026", time: "10:00 AM", present: true },
    { name: "Leadership Workshop", date: "11 Mar 2026", time: "11:30 AM", present: true },
    { name: "Career Guidance", date: "12 Mar 2026", time: "2:00 PM", present: false },
    { name: "Technical Training", date: "13 Mar 2026", time: "9:30 AM", present: true },
    { name: "Soft Skills", date: "14 Mar 2026", time: "1:00 PM", present: true }
  ];

  const rows = SCHOLARS.map(s => [
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <Av name={s.name} size={28} color={T.navy}/>
      <span style={{fontSize:13,fontWeight:600,color:T.navy}}>{s.name}</span>
    </div>,
    <span style={{fontSize:13,color:T.textMid}}>{s.programme}</span>,
    <span style={{fontSize:13,fontWeight:700,color:T.success}}>
      {Math.round(s.attendance*0.2)}
    </span>,
    <span style={{fontSize:13,fontWeight:700,color:T.danger}}>
      {20-Math.round(s.attendance*0.2)}
    </span>,
    <div style={{minWidth:120}}>
      <div style={{
        fontSize:13,
        fontWeight:700,
        color:s.attendance<80?T.danger:T.success,
        marginBottom:4
      }}>
        {s.attendance}%
      </div>
      <Bar pct={s.attendance} color={s.attendance<80?T.danger:T.success} h={4}/>
    </div>,
    <Pill
      label={s.attendance>=85?"Excellent":s.attendance>=75?"Good":"Low"}
      v={s.attendance>=85?"success":s.attendance>=75?"warn":"danger"}
      xs
    />
  ]);

  return (
    <div style={{padding:32}}>

      <SH
        title="Attendance"
        sub="Track and manage scholar attendance"
        onAction={role!=="scholar"?()=>{}:null}
        actionIcon="check"
        actionLabel="Mark Attendance"
      />

      {role==="scholar"?(
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>

          <Card>

            <h3 style={{
              margin:"0 0 20px",
              fontSize:15,
              fontWeight:700,
              color:T.navy,
              fontFamily:"'Sora',sans-serif"
            }}>
              Session Attendance
            </h3>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>

              {sessions.map((s,i)=>(
                <div key={i}
                  style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    padding:"12px 14px",
                    border:`1px solid ${T.border}`,
                    borderRadius:10,
                    background:T.white
                  }}
                >

                  <div>
                    <div style={{
                      fontSize:14,
                      fontWeight:700,
                      color:T.navy
                    }}>
                      {s.name}
                    </div>

                    <div style={{
                      fontSize:12,
                      color:T.textSub
                    }}>
                      {s.date} • {s.time}
                    </div>
                  </div>

                  <Pill
                    label={s.present ? "Present" : "Absent"}
                    v={s.present ? "success" : "danger"}
                    xs
                  />

                </div>
              ))}

            </div>

          </Card>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Kpi icon="check" label="Present Days" value="16" accent={T.success}/>
            <Kpi icon="x" label="Absent Days" value="4" accent={T.danger}/>
            <Kpi icon="cal" label="Attendance Rate" value="94%" accent={T.navy}/>
          </div>

        </div>
      ):(
        <DataTable cols={["Scholar","Programme","Present","Absent","Rate","Status"]} rows={rows}/>
      )}

    </div>
  );
}

export default AttendancePage;