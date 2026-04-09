import { useState, useEffect } from "react";
import { T } from "../theme";
import { apiFetch } from "../api";

import Av from "../components/Av";
import Icon from "../components/Icon";
import Kpi from "../components/Kpi";
import Card from "../components/Card";
import SH from "../components/SH";
import Bar from "../components/Bar";

function ScholarDash({ onNav }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch("/api/stats/scholar");
        setStats(res);
      } catch (error) {
        console.error("Error fetching scholar stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? "Good morning"
      : today.getHours() < 18
      ? "Good afternoon"
      : "Good evening";

  const dateString = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (loading) return <div style={{ padding: 32 }}>Loading your dashboard...</div>;
  if (!stats) return <div style={{ padding: 32 }}>No data available.</div>;

  return (
    <div style={{ padding: 32 }}>

      {/* Greeting Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <Av name={stats.name} size={50} color={T.navy} />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              color: T.navy,
              fontFamily: "'Sora',sans-serif",
              letterSpacing: -0.3
            }}
          >
            {greeting}, {stats.name}
          </h1>

          <p style={{ margin: "4px 0 0", fontSize: 14, color: T.textMid }}>
            {dateString} · {stats.role}
          </p>
        </div>
      </div>

      {/* Alert */}
      {stats.pendingCount > 0 && (
        <div
          style={{
            background: T.warnBg,
            border: "1px solid #F5D060",
            borderRadius: 12,
            padding: "12px 18px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <Icon name="warn" size={16} color={T.warn} />
          <span style={{ fontSize: 13, color: T.warn, fontWeight: 500 }}>
            You have <strong>{stats.pendingCount} assignments</strong> pending submission.
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 32
        }}
      >
        <Kpi icon="grid" label="Active Programmes" value={stats.activeProgrammes} accent={T.navy} delta={0} />
        <Kpi icon="file" label="Pending Assignments" value={stats.pendingCount} accent={T.danger} />
        <Kpi icon="cal" label="Attendance Rate" value={`${stats.attendanceRate}%`} accent={T.success} delta={0} />
        <Kpi icon="trend" label="Overall Score" value={stats.overallScore} accent="#7C3AED" delta={0} />
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>

        {/* Programmes */}
        <Card>

          <SH
            title="Your Programmes"
            sub="Courses you are currently enrolled in"
            onAction={() => onNav("programmes")}
            actionIcon="arrowR"
            actionLabel="View all"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* For now, just show a message or fetch some courses */}
            <p style={{ fontSize: 13, color: T.textSub }}>Check the Programmes page to see all available courses.</p>
          </div>
        </Card>

        {/* Pending Assignments */}
        <Card>
          <SH
            title="Recent Assignments"
            sub="Due soon"
            onAction={() => onNav("assignments")}
            actionIcon="arrowR"
            actionLabel="View all"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stats.pendingAssignments.length > 0 ? (
              stats.pendingAssignments.map(a => (
                <div key={a._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: T.chalk, borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: T.textSub, marginTop: 2 }}>Due: {new Date(a.due).toLocaleDateString()}</div>
                  </div>
                  <Icon name="arrowR" size={12} color={T.textSub} />
                </div>
              ))
            ) : (
              <p style={{ fontSize: 13, color: T.textSub }}>No pending assignments. Great job!</p>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}

export default ScholarDash;