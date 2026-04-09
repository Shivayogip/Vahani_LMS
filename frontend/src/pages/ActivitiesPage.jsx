import { useState, useEffect } from "react";
import { T } from "../theme";
import { apiFetch } from "../api";

import SH from "../components/SH";
import Card from "../components/Card";
import Pill from "../components/Pill";
import Icon from "../components/Icon";
import Bar from "../components/Bar";

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const TC = { Sports: T.success, Cultural: "#5B35B0", Academic: T.navy, Creative: T.danger };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await apiFetch("/api/activities");
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return <div style={{ padding: 32 }}>Loading activities...</div>;

  return (
    <div style={{ padding: 32 }}>
      <SH title="Voluntary Activities" sub="Register and manage scholar activities" onAction={() => { }} actionIcon="plus" actionLabel="Add Activity" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
        {activities.map(a => {
          const pct = Math.round(a.registered / (a.capacity || 1) * 100);
          const color = TC[a.type] || T.navy;
          return (
            <Card key={a._id} style={{ transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 12px 40px ${T.shadowMd}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 2px 12px ${T.shadow}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <Pill label={a.type} v={a.type === "Sports" ? "success" : a.type === "Cultural" ? "sky" : a.type === "Academic" ? "navy" : "danger"} xs />
                <div style={{ fontSize: 11, color: T.textSub, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="cal" size={11} color={T.textSub} />{a.date}
                </div>
              </div>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif" }}>{a.name}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 12, color: T.textSub }}>Registrations</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{a.registered}<span style={{ color: T.textSub }}>/{a.capacity}</span></span>
              </div>
              <Bar pct={pct} color={color} h={7} />
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button style={{ flex: 1, padding: "9px", background: color, color: T.white, border: "none", borderRadius: 9,
                  cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Register Now</button>
                <button style={{ padding: "9px 14px", background: "transparent", color: T.textMid,
                  border: `1.5px solid ${T.border}`, borderRadius: 9, cursor: "pointer", fontSize: 13,
                  fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="eye" size={13} color={T.textMid} /> Details
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ActivitiesPage;