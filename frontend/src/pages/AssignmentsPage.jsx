import { useState, useEffect } from "react";
import { apiFetch } from "../api";

import { T } from "../theme";

import SH from "../components/SH";
import Card from "../components/Card";
import Field from "../components/Field";
import Icon from "../components/Icon";
import Bar from "../components/Bar";
import Pill from "../components/Pill";
import AssignmentDetail from "./AssignmentDetail";

function AssignmentsPage({ role }) {

  const [assignments,setAssignments]=useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm,setShowForm]=useState(false);
  const [dueDateFilter,setDueDateFilter]=useState("All");
  const [programmeFilter,setProgrammeFilter]=useState("All");
  const [selectedAssignmentId,setSelectedAssignmentId]=useState(null);

  const [title,setTitle]=useState("");
  const [programmeId,setProgrammeId]=useState("");
  const [due,setDue]=useState("");
  const [marks,setMarks]=useState("");

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await apiFetch("/api/assignments");
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await apiFetch("/api/courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const programmes=["All",...new Set(assignments.map(a=>a.course?.name).filter(Boolean))];

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

  const filteredAssignments=assignments.filter(a=>{
    const dueDateMatch=dueDateFilter==="All"||
      (dueDateFilter==="Completed"&&a.status==="Closed")||
      getDueDateCategory(a.due)===dueDateFilter;

    const programmeMatch=programmeFilter==="All"||a.course?.name===programmeFilter;

    return dueDateMatch&&programmeMatch;
  });

  const createAssignment=async ()=>{

    if(!title||!programmeId||!due) return;

    try {
      const newAssignment={
        title,
        course: programmeId,
        due,
        points: marks,
      };

      await apiFetch("/api/assignments", {
        method: "POST",
        body: JSON.stringify(newAssignment)
      });
      fetchAssignments();

      setTitle("");
      setProgrammeId("");
      setDue("");
      setMarks("");

      setShowForm(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };


  if(selectedAssignmentId){
    return (
      <AssignmentDetail
        assignmentId={selectedAssignmentId}
        role={role}
        onBack={()=>setSelectedAssignmentId(null)}
      />
    );
  }

  if (loading) return <div style={{padding:32}}>Loading assignments...</div>;

  return (
    <div style={{padding:32}}>

      <SH
        title="Assignments"
        sub="Manage and track all assignments"
        onAction={role!=="scholar"?()=>setShowForm(!showForm):null}
        actionIcon="plus"
        actionLabel="New Assignment"
      />

      {showForm&&(
        <Card style={{marginBottom:24}}>

          <h3 style={{
            margin:"0 0 20px",
            fontSize:16,
            fontWeight:700,
            color:T.navy,
            fontFamily:"'Sora',sans-serif"
          }}>
            Create Assignment
          </h3>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>

            <Field
              label="Assignment Title"
              placeholder="Enter title"
              value={title}
              onChange={e=>setTitle(e.target.value)}
            />

            <Field
              label="Programme"
              type="select"
              placeholder="Select programme"
              value={programmeId}
              onChange={e=>setProgrammeId(e.target.value)}
              options={courses.map(c => ({ value: c._id, label: c.name }))}
            />

            <Field
              label="Due Date"
              type="date"
              value={due}
              onChange={e=>setDue(e.target.value)}
            />

            <Field
              label="Max Marks"
              placeholder="100"
              value={marks}
              onChange={e=>setMarks(e.target.value)}
            />

          </div>

          <div style={{display:"flex",gap:10}}>

            <button
              onClick={createAssignment}
              style={{
                padding:"10px 24px",
                background:T.navy,
                color:T.white,
                border:"none",
                borderRadius:10,
                cursor:"pointer",
                fontWeight:600,
                fontSize:14,
                fontFamily:"'DM Sans',sans-serif"
              }}
            >
              Create
            </button>

            <button
              onClick={()=>setShowForm(false)}
              style={{
                padding:"10px 20px",
                background:"transparent",
                color:T.textMid,
                border:`1.5px solid ${T.border}`,
                borderRadius:10,
                cursor:"pointer",
                fontSize:14,
                fontFamily:"'DM Sans',sans-serif"
              }}
            >
              Cancel
            </button>

          </div>

        </Card>
      )}

      <div style={{marginBottom:24}}>

        <div style={{marginBottom:16}}>
          <div style={{
            fontSize:12,
            fontWeight:700,
            color:T.navy,
            marginBottom:8,
            textTransform:"uppercase",
            letterSpacing:0.5
          }}>
            Due Date
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["All","Completed","Overdue","This Week","Next Week","Later"].map(filter=>(
              <button
                key={filter}
                onClick={()=>setDueDateFilter(filter)}
                style={{
                  padding:"8px 18px",
                  borderRadius:9,
                  border:`1.5px solid ${dueDateFilter===filter?T.navy:T.border}`,
                  cursor:"pointer",
                  background:dueDateFilter===filter?T.navy:T.white,
                  color:dueDateFilter===filter?T.white:T.textMid,
                  fontWeight:600,
                  fontSize:13,
                  fontFamily:"'DM Sans',sans-serif"
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontSize:12,
            fontWeight:700,
            color:T.navy,
            marginBottom:8,
            textTransform:"uppercase",
            letterSpacing:0.5
          }}>
            Programmes
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {programmes.map(programme=>(
              <button
                key={programme}
                onClick={()=>setProgrammeFilter(programme)}
                style={{
                  padding:"8px 18px",
                  borderRadius:9,
                  border:`1.5px solid ${programmeFilter===programme?T.navy:T.border}`,
                  cursor:"pointer",
                  background:programmeFilter===programme?T.navy:T.white,
                  color:programmeFilter===programme?T.white:T.textMid,
                  fontWeight:600,
                  fontSize:13,
                  fontFamily:"'DM Sans',sans-serif",
                  maxWidth:250,
                  overflow:"hidden",
                  textOverflow:"ellipsis",
                  whiteSpace:"nowrap"
                }}
              >
                {programme}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div style={{display:"flex",flexDirection:"column",gap:16}}>

        {filteredAssignments.map(a=>{

          const pct=Math.round((a.totalSubmissions/(a.course?.enrolled || 1))*100)||0;

          return(
            <Card key={a._id}>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>

                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>

                    <div style={{
                      width:38,
                      height:38,
                      borderRadius:10,
                      background:`${T.navy}10`,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center"
                    }}>
                      <Icon name="file" size={16} color={T.navy}/>
                    </div>

                    <div>
                      <div style={{
                        fontSize:15,
                        fontWeight:700,
                        color:T.navy,
                        fontFamily:"'Sora',sans-serif"
                      }}>
                        {a.title}
                      </div>

                      <div style={{fontSize:12,color:T.textSub,marginTop:1}}>
                        {a.course?.name} · Due: {new Date(a.due).toLocaleDateString()}
                      </div>
                    </div>

                  </div>

                  {role!=="scholar"&&(
                    <div style={{marginTop:14,maxWidth:420}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:12,color:T.textSub}}>Submissions</span>
                        <span style={{fontSize:12,fontWeight:700,color:T.text}}>
                          {a.totalSubmissions}/{a.course?.enrolled || 0} ({pct}%)
                        </span>
                      </div>
                      <Bar pct={pct} color={pct>80?T.success:pct>50?T.sun:T.danger} h={5}/>
                    </div>
                  )}

                </div>

                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>

                  <Pill label={a.status} v={a.status==="Open"?"success":"default"}/>

                  <button
                    onClick={()=>setSelectedAssignmentId(a._id)}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:5,
                      padding:"8px 16px",
                      background:T.white,
                      color:T.navy,
                      border:`1.5px solid ${T.border}`,
                      borderRadius:8,
                      cursor:"pointer",
                      fontSize:12,
                      fontWeight:600
                    }}
                  >
                    <Icon name="eye" size={12} color={T.navy}/> View
                  </button>

                </div>

              </div>

            </Card>
          );
        })}

      </div>

    </div>
  );
}

export default AssignmentsPage;