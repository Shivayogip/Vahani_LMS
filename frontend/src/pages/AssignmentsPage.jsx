import { useState } from "react";

import { T } from "../theme";
import { ASSIGNMENTS } from "../data/data";

import SH from "../components/SH";
import Card from "../components/Card";
import Field from "../components/Field";
import Icon from "../components/Icon";
import Bar from "../components/Bar";
import Pill from "../components/Pill";
import AssignmentDetail from "./AssignmentDetail";


function AssignmentsPage({ role }) {
  const [showForm,setShowForm]=useState(false);
  const [dueDateFilter,setDueDateFilter]=useState("All");
  const [programmeFilter,setProgrammeFilter]=useState("All");
  const [selectedAssignmentId,setSelectedAssignmentId]=useState(null);

  const programmes=["All",...new Set(ASSIGNMENTS.map(a=>a.programme))];

  const getDueDateCategory=(dueStr)=>{
    const dueDate=new Date(dueStr);
    const today=new Date();

    dueDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffDays=(dueDate-today)/(1000*60*60*24);

    if(diffDays<0)return"Overdue";
    if(diffDays<=7)return"This Week";
    if(diffDays<=14)return"Next Week";
    return"Later";
  };

  const filteredAssignments=ASSIGNMENTS.filter(a=>{
    const dueDateMatch=dueDateFilter==="All"||
      (dueDateFilter==="Completed"&&a.status==="Closed")||
      getDueDateCategory(a.due)===dueDateFilter;
    const programmeMatch=programmeFilter==="All"||a.programme===programmeFilter;
    return dueDateMatch&&programmeMatch;
  });

  if(selectedAssignmentId){
    return <AssignmentDetail assignmentId={selectedAssignmentId} role={role} onBack={()=>setSelectedAssignmentId(null)}/>;
  }

  return (
    <div style={{padding:32}}>
      <SH title="Assignments" sub="Manage and track all assignments" onAction={role!=="scholar"?()=>setShowForm(!showForm):null} actionIcon="plus" actionLabel="New Assignment"/>
      {showForm&&(
        <Card style={{marginBottom:24}}>
          <h3 style={{margin:"0 0 20px",fontSize:16,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif"}}>Create Assignment</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>
            <Field label="Assignment Title" placeholder="Enter title"/>
            <Field label="Programme" placeholder="Select programme"/>
            <Field label="Due Date" type="date"/>
            <Field label="Max Marks" placeholder="100"/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setShowForm(false)} style={{padding:"10px 24px",background:T.navy,color:T.white,
              border:"none",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>Create</button>
            <button onClick={()=>setShowForm(false)} style={{padding:"10px 20px",background:"transparent",color:T.textMid,
              border:`1.5px solid ${T.border}`,borderRadius:10,cursor:"pointer",fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>Cancel</button>
          </div>
        </Card>
      )}
      <div style={{marginBottom:24}}>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.navy,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Due Date</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["All","Completed","Overdue","This Week","Next Week","Later"].map(filter=>(
              <button key={filter} onClick={()=>setDueDateFilter(filter)} style={{padding:"8px 18px",borderRadius:9,
                border:`1.5px solid ${dueDateFilter===filter?T.navy:T.border}`,cursor:"pointer",
                background:dueDateFilter===filter?T.navy:T.white,color:dueDateFilter===filter?T.white:T.textMid,
                fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s"}}>{filter}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={{fontSize:12,fontWeight:700,color:T.navy,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Programmes</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {programmes.map(programme=>(
              <button key={programme} onClick={()=>setProgrammeFilter(programme)} style={{padding:"8px 18px",borderRadius:9,
                border:`1.5px solid ${programmeFilter===programme?T.navy:T.border}`,cursor:"pointer",
                background:programmeFilter===programme?T.navy:T.white,color:programmeFilter===programme?T.white:T.textMid,
                fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"all .14s",
                maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{programme}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {filteredAssignments.map(a=>{
          const pct=Math.round(a.submitted/a.total*100);
          return (
            <Card key={a.id}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`${T.navy}10`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Icon name="file" size={16} color={T.navy}/>
                    </div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:T.navy,fontFamily:"'Sora',sans-serif"}}>{a.title}</div>
                      <div style={{fontSize:12,color:T.textSub,marginTop:1}}>{a.programme} · Due: {a.due}</div>
                    </div>
                  </div>
                  {role!=="scholar"&&(
                    <div style={{marginTop:14,maxWidth:420}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:12,color:T.textSub}}>Submissions</span>
                        <span style={{fontSize:12,fontWeight:700,color:T.text}}>{a.submitted}/{a.total} ({pct}%)</span>
                      </div>
                      <Bar pct={pct} color={pct>80?T.success:pct>50?T.sun:T.danger} h={5}/>
                    </div>
                  )}
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"flex-end",flexShrink:0,flexWrap:"wrap"}}>
                  <Pill label={a.status} v={a.status==="Open"?"success":"default"}/>
                  <button onClick={()=>setSelectedAssignmentId(a.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 16px",
                    background:T.white,color:T.navy,border:`1.5px solid ${T.border}`,borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
                    <Icon name="eye" size={12} color={T.navy}/> View
                  </button>
                  {role!=="scholar"&&<button style={{display:"flex",alignItems:"center",gap:5,padding:"8px 16px",
                    background:T.navy,color:T.white,border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
                    <Icon name="pencil" size={12} color={T.white}/> Grade
                  </button>}
                  {role==="scholar"&&a.status==="Open"&&<button style={{display:"flex",alignItems:"center",gap:5,
                    padding:"8px 16px",background:T.sun,color:T.navyD,border:"none",borderRadius:8,
                    cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>
                    <Icon name="upload" size={12} color={T.navyD}/> Submit
                  </button>}
                </div>
              </div>
            </Card>
          );
        })}
        {filteredAssignments.length===0&&(
          <Card>
            <div style={{fontSize:14,fontWeight:600,color:T.textMid,fontFamily:"'DM Sans',sans-serif"}}>
              No assignments match the selected filters.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AssignmentsPage;
