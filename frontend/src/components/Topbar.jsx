import { T } from "../theme";
import Icon from "./Icon";
import Av from "./Av";
import { useState, useRef, useEffect } from "react";

const LABELS = {
  dashboard: "Overview",
  scholars: "Scholars",
  programmes: "Programmes",
  assignments: "Assignments",
  resources: "Resources",
  attendance: "Attendance",
  trainers: "Trainers & Tutors",
  activities: "Activities",
  reports: "Reports & Analytics",
  profile: "My Profile"
};

function Topbar({ page, role, backendOk, onNav }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const profileData = {
    scholar: {
      name: "Aarav Mehta",
      year: "2nd Year",
      college: "Indian Institute of Technology, Delhi",
      programme: "Advanced Software Development",
      contact: "+91 98765 43210",
      email: "aarav.mehta@vahani.org"
    },
    trainer: {
      name: "Dr. Sunita Rao",
      title: "Senior Faculty",
      department: "Computer Science",
      specialization: "Advanced Software Development",
      experience: "12 years",
      contact: "+91 98765 43211",
      email: "sunita.rao@vahani.org"
    },
    admin: {
      name: "Admin User",
      position: "System Administrator",
      department: "Administration",
      responsibilities: "System Management, User Access Control",
      contact: "+91 98765 43212",
      email: "admin@vahani.org"
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <div
      style={{
        height: 64,
        borderBottom: `1px solid ${T.border}`,
        background: T.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >

      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: T.navy,
          fontFamily: "'Sora',sans-serif",
          letterSpacing: -0.3
        }}
      >
        {LABELS[page] || "Dashboard"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            borderRadius: 999,
            background: backendOk ? T.successBg : T.dangerBg,
            border: `1px solid ${backendOk ? "#A7DFD0" : "#F5BBBB"}`,
            fontSize: 11,
            fontWeight: 700,
            color: backendOk ? T.success : T.danger
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: backendOk ? T.success : T.danger
            }}
          />
          {backendOk ? "Backend Connected" : "Backend Offline"}
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)"
            }}
          >
            <Icon name="search" size={14} color={T.textSub} />
          </div>

          <input
            placeholder="Search..."
            style={{
              padding: "8px 14px 8px 34px",
              borderRadius: 10,
              border: `1.5px solid ${T.border}`,
              fontSize: 13,
              color: T.text,
              outline: "none",
              background: T.chalk,
              fontFamily: "'DM Sans',sans-serif",
              width: 200
            }}
          />
        </div>

        <button
          style={{
            position: "relative",
            width: 38,
            height: 38,
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: T.white,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon name="bell" size={17} color={T.textMid} />

          <div
            style={{
              position: "absolute",
              top: 8,
              right: 9,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: T.danger,
              border: `2px solid ${T.white}`
            }}
          />
        </button>

        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "5px 12px",
              borderRadius: 10,
              border: `1px solid ${T.border}`,
              background: T.chalk,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif"
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
              size={28}
              color={T.navy}
            />

            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.navy,
                  lineHeight: 1
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
                  fontSize: 11,
                  color: T.textSub,
                  marginTop: 2,
                  textTransform: "capitalize"
                }}
              >
                {role}
              </div>
            </div>

            <Icon name={dropdownOpen ? "chevU" : "chevD"} size={13} color={T.textSub} />
          </button>

          {dropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 8,
              width: 320,
              background: T.white,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: 18,
              boxShadow: `0 10px 30px ${T.shadow}`,
              zIndex: 100
            }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.textSub,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 10
                }}>
                  Profile Details
                </div>
                <div style={{
                  fontSize: 13,
                  color: T.text,
                  lineHeight: 1.8
                }}>
                  {role === "scholar" ? (
                    <>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Name:</span> {profileData[role].name}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Year:</span> {profileData[role].year}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>College:</span> {profileData[role].college}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Programme:</span> {profileData[role].programme}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Contact:</span> {profileData[role].contact}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>Email:</span> {profileData[role].email}
                      </div>
                    </>
                  ) : role === "trainer" ? (
                    <>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Name:</span> {profileData[role].name}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Title:</span> {profileData[role].title}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Department:</span> {profileData[role].department}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Specialization:</span> {profileData[role].specialization}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Experience:</span> {profileData[role].experience}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Contact:</span> {profileData[role].contact}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>Email:</span> {profileData[role].email}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Name:</span> {profileData[role].name}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Position:</span> {profileData[role].position}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Department:</span> {profileData[role].department}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Responsibilities:</span> {profileData[role].responsibilities}
                      </div>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>Contact:</span> {profileData[role].contact}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>Email:</span> {profileData[role].email}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button 
                onClick={() => {
                  onNav("profile");
                  setDropdownOpen(false);
                }}
                style={{
                width: "100%",
                padding: "10px",
                background: T.navy,
                color: T.white,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
                transition: "all .2s"
              }}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Topbar;