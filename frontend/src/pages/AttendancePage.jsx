import { useState, useEffect } from "react";
import { T } from "../theme";
import { apiFetch } from "../api";

import SH from "../components/SH";
import Card from "../components/Card";
import Bar from "../components/Bar";
import Pill from "../components/Pill";
import Icon from "../components/Icon";
import Kpi from "../components/Kpi";
import DataTable from "../components/DataTable";
import Av from "../components/Av";

function AttendancePage({ role }) {
  const [attendance, setAttendance] = useState([]);
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "scholar") {
          const profile = await apiFetch("/api/users/profile");
          const data = await apiFetch(`/api/attendance/scholar/${profile._id}`);
          setAttendance(data);
        } else {
          const data = await apiFetch("/api/users/scholars");
          setScholars(data);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role]);

  if (loading) return <div style={{ padding: 32 }}>Loading attendance...</div>;

  const rows = scholars.map(s => [
    <div key={s._id} style={{display:"flex",alignItems:"center",gap:10}}>
      <Av name={s.name} size={28} color={T.navy}/>
      <span style={{fontSize:13,fontWeight:600,color:T.navy}}>{s.name}</span>
    </div>,
    <span style={{fontSize:13,color:T.textMid}}>{s.programme}</span>,
    <span style={{fontSize:13,fontWeight:700,color:T.success}}>
      {Math.round(s.attendance * 0.2)}
    </span>,
    <span style={{fontSize:13,fontWeight:700,color:T.danger}}>
      {20 - Math.round(s.attendance * 0.2)}
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

              {attendance.length > 0 ? (
                attendance.map((s,i)=>(
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
                        {s.sessionTitle || s.course?.name}
                      </div>
                      <div style={{fontSize:11,color:T.textSub,marginTop:2}}>
                        {new Date(s.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Pill label={s.status} v={s.status==="Present"?"success":"danger"} xs/>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 13, color: T.textSub }}>No attendance records found.</p>
              )}
            </div>
          </Card>

          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <Kpi icon="cal" label="Attendance" value={`${attendance.length > 0 ? Math.round(attendance.filter(a => a.status === "Present").length / attendance.length * 100) : 0}%`} accent={T.success}/>
            <Card>
              <SH title="Summary" sub="Quick overview"/>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,color:T.textSub}}>Total Sessions</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.navy}}>{attendance.length}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,color:T.textSub}}>Present</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.success}}>{attendance.filter(a => a.status === "Present").length}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,color:T.textSub}}>Absent</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.danger}}>{attendance.filter(a => a.status === "Absent").length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <DataTable
          cols={["Scholar","Programme","Present","Absent","Attendance %","Status"]}
          rows={rows}
        />
      )}
    </div>
  );
}

export default AttendancePage;