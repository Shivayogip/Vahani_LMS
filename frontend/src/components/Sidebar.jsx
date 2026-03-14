import { T } from "../theme";
import Icon from "./Icon";
import Logo from "./Logo";
import Av from "./Av";

const scholarNav = [
  { key: "dashboard", icon: "dash", label: "Dashboard" },
  { key: "programmes", icon: "grid", label: "Programmes" },
  { key: "assignments", icon: "file", label: "Assignments" },
  { key: "resources", icon: "book", label: "Resources" },
  { key: "attendance", icon: "cal", label: "Attendance" },
  { key: "activities", icon: "clock", label: "Activities" },
  { key: "profile", icon: "user", label: "Profile" }
];

const adminNav = [
  { key: "dashboard", icon: "dash", label: "Overview" },
  { key: "scholars", icon: "grad", label: "Scholars" },
  { key: "programmes", icon: "grid", label: "Programmes" },
  { key: "assignments", icon: "file", label: "Assignments" },
  { key: "resources", icon: "book", label: "Resources" },
  { key: "attendance", icon: "cal", label: "Attendance" },
  { key: "trainers", icon: "users", label: "Trainers" },
  { key: "activities", icon: "clock", label: "Activities" },
  { key: "reports", icon: "bar", label: "Reports" },
  { key: "profile", icon: "user", label: "Profile" }
];

function Sidebar({ page, setPage, role, onLogout }) {

  const nav = role === "scholar" ? scholarNav : adminNav;

  return (
    <div
      style={{
        width: 228,
        background: T.navyD,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        zIndex: 200
      }}
    >
      <div
        style={{
          padding: "28px 22px 18px",
          borderBottom: "1px solid rgba(255,255,255,.06)"
        }}
      >
        <Logo width={120} light />

        <div
          style={{
            marginTop: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(245,200,66,.1)",
            padding: "3px 10px",
            borderRadius: 999
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.sun
            }}
          />

          <span
            style={{
              fontSize: 10,
              color: T.sun,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1
            }}
          >
            {role} portal
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,.18)",
            textTransform: "uppercase",
            letterSpacing: 1.2,
            padding: "0 12px 10px",
            fontFamily: "'Sora',sans-serif"
          }}
        >
          Navigation
        </div>

        {nav.map((item) => {

          const active = page === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                marginBottom: 2,
                background: active ? `${T.sun}18` : "transparent",
                color: active ? T.sun : "rgba(255,255,255,.5)",
                fontWeight: active ? 600 : 400,
                fontSize: 13.5,
                fontFamily: "'DM Sans',sans-serif",
                transition: "all .14s",
                borderLeft: active
                  ? `2.5px solid ${T.sun}`
                  : "2.5px solid transparent"
              }}
            >
              <Icon
                name={item.icon}
                size={15}
                color={active ? T.sun : "rgba(255,255,255,.4)"}
                sw={active ? 2 : 1.5}
              />

              {item.label}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "14px 10px",
          borderTop: "1px solid rgba(255,255,255,.06)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            background: "rgba(255,255,255,.04)",
            borderRadius: 12,
            marginBottom: 8
          }}
        >
          <Av
            name={
              role === "scholar"
                ? "Aarav Mehta"
                : role === "trainer"
                ? "Sunita Rao"
                : "Admin User"
            }
            size={30}
            color={T.sun}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: T.white,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {role === "scholar"
                ? "Aarav Mehta"
                : role === "trainer"
                ? "Dr. Sunita Rao"
                : "Admin"}
            </div>

            <div
              style={{
                color: "rgba(255,255,255,.3)",
                fontSize: 11,
                marginTop: 1
              }}
            >
              {role}@vahani.org
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            borderRadius: 9,
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: "rgba(255,255,255,.3)",
            fontSize: 13,
            fontFamily: "'DM Sans',sans-serif",
            transition: "all .14s"
          }}
        >
          <Icon name="logout" size={14} color="currentColor" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;