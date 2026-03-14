import { T } from "../theme";
import { PROGRAMMES } from "../data/data";

import Av from "../components/Av";
import Icon from "../components/Icon";
import Kpi from "../components/Kpi";
import Card from "../components/Card";
import SH from "../components/SH";
import Bar from "../components/Bar";

function ScholarDash({ onNav }) {

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

  const userName = "Aarav";
  const userRole = "2nd Year Scholar";

  return (
    <div style={{ padding: 32 }}>

      {/* Greeting Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <Av name={userName} size={50} color={T.navy} />

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
            {greeting}, {userName}
          </h1>

          <p style={{ margin: "4px 0 0", fontSize: 14, color: T.textMid }}>
            {dateString} · {userRole}
          </p>
        </div>
      </div>

      {/* Alert */}
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
          You have <strong>2 assignments</strong> due this week and{" "}
          <strong>1 quiz</strong> scheduled for Friday.
        </span>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 32
        }}
      >
        <Kpi icon="grid" label="Active Programmes" value="5" accent={T.navy} delta={0} />
        <Kpi icon="file" label="Pending Assignments" value="2" accent={T.danger} />
        <Kpi icon="cal" label="Attendance Rate" value="94%" accent={T.success} delta={3} />
        <Kpi icon="trend" label="Overall Score" value="88" accent="#7C3AED" delta={5} />
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>

        {/* Programmes */}
        <Card>

          <SH
            title="My Programmes"
            sub="Current semester"
            onAction={() => onNav("programmes")}
            actionIcon="arrowR"
            actionLabel="View all"
          />

          {PROGRAMMES.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "13px 0",
                borderBottom: i < 3 ? `1px solid ${T.border}` : "none"
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: p.color,
                  flexShrink: 0
                }}
              />

              <div style={{ flex: 1 }}>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {p.name}
                  </span>

                  <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>
                    {p.completion}%
                  </span>
                </div>

                <Bar pct={p.completion} color={p.color} h={5} />

                <span
                  style={{
                    fontSize: 11,
                    color: T.textSub,
                    marginTop: 3,
                    display: "block"
                  }}
                >
                  {p.trainer}
                </span>

              </div>
            </div>
          ))}
        </Card>

        {/* Right Side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Upcoming Sessions */}
          <Card>

            <h3
              style={{
                margin: "0 0 15px",
                fontSize: 15,
                fontWeight: 700,
                color: T.navy,
                fontFamily: "'Sora',sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <Icon name="cal" size={15} color={T.navy} />
              Upcoming Sessions
            </h3>

            {[
              { t: "Machine Learning", d: "Mar 11, 10:00 AM", host: "Dr. S. Rao" },
              { t: "Resume Workshop", d: "Mar 12, 4:00 PM", host: "Mr. V. Nair" },
              { t: "Career Guidance", d: "Mar 13, 2:30 PM", host: "Prof. A. Gupta" }
            ].map((s, i) => (

              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: i < 2 ? `1px solid ${T.border}` : "none"
                }}
              >

                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {s.t}
                  </div>

                  <div style={{ fontSize: 11, color: T.textSub, marginTop: 2 }}>
                    {s.d} · {s.host}
                  </div>
                </div>

                <button
                  style={{
                    padding: "5px 12px",
                    background: T.navy,
                    color: T.white,
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif"
                  }}
                >
                  Join
                </button>

              </div>

            ))}

          </Card>

          {/* Announcements */}
          <Card>

            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 15,
                fontWeight: 700,
                color: T.navy,
                fontFamily: "'Sora',sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <Icon name="bell" size={15} color={T.navy} />
              Announcements
            </h3>

            {[
              { t: "AI Workshop", d: "Tomorrow 4 PM", dot: T.sun },
              { t: "Scholarship Disbursement Update", d: "Mar 8 · 11 AM", dot: T.success },
              { t: "Assignment Deadline Extended", d: "Mar 6 · 6:30 PM", dot: T.danger }
            ].map((a, i) => (

              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "9px 0",
                  borderBottom: i < 2 ? `1px solid ${T.border}` : "none"
                }}
              >

                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: a.dot,
                    marginTop: 4,
                    flexShrink: 0
                  }}
                />

                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>
                    {a.t}
                  </div>

                  <div style={{ fontSize: 11, color: T.textSub }}>
                    {a.d}
                  </div>
                </div>

              </div>

            ))}

          </Card>

        </div>

      </div>

    </div>
  );
}

export default ScholarDash;