import { useState } from "react";
import { T } from "../theme";
import Icon from "../components/Icon";

function ProfilePage({ role = "scholar" }) {
  const roleData = {
    scholar: {
      title: "Scholar Profile",
      subtitle: "Manage your academic information",
      fields: [
        { name: "name", label: "Full Name", type: "text", default: "Aarav Mehta" },
        { name: "year", label: "Year", type: "text", default: "2nd Year" },
        { name: "college", label: "College", type: "text", default: "Indian Institute of Technology, Delhi" },
        { name: "programme", label: "Programme", type: "text", default: "Advanced Software Development" },
        { name: "contact", label: "Contact Number", type: "tel", default: "+91 98765 43210" },
        { name: "email", label: "Email", type: "email", default: "aarav.mehta@vahani.org" },
        { name: "password", label: "Password", type: "password", default: "••••••••" }
      ]
    },
    trainer: {
      title: "Trainer Profile",
      subtitle: "Manage your teaching information",
      fields: [
        { name: "name", label: "Full Name", type: "text", default: "Dr. Sunita Rao" },
        { name: "title", label: "Title/Designation", type: "text", default: "Senior Faculty" },
        { name: "department", label: "Department", type: "text", default: "Computer Science" },
        { name: "specialization", label: "Specialization", type: "text", default: "Advanced Software Development" },
        { name: "experience", label: "Years of Experience", type: "text", default: "12 years" },
        { name: "contact", label: "Contact Number", type: "tel", default: "+91 98765 43211" },
        { name: "email", label: "Email", type: "email", default: "sunita.rao@vahani.org" },
        { name: "password", label: "Password", type: "password", default: "••••••••" }
      ]
    },
    admin: {
      title: "Admin Profile",
      subtitle: "Manage your administration information",
      fields: [
        { name: "name", label: "Full Name", type: "text", default: "Admin User" },
        { name: "position", label: "Position", type: "text", default: "System Administrator" },
        { name: "department", label: "Department", type: "text", default: "Administration" },
        { name: "responsibilities", label: "Responsibilities", type: "text", default: "System Management, User Access Control" },
        { name: "contact", label: "Contact Number", type: "tel", default: "+91 98765 43212" },
        { name: "email", label: "Email", type: "email", default: "admin@vahani.org" },
        { name: "password", label: "Password", type: "password", default: "••••••••" }
      ]
    }
  };

  const currentRoleData = roleData[role] || roleData.scholar;
  
  const [formData, setFormData] = useState(
    currentRoleData.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.default
    }), {})
  );

  const [profilePic, setProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ 
      padding: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100%"
    }}>
      <div style={{ marginBottom: 32, textAlign: "center", width: "100%" }}>
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 800,
          color: T.navy,
          fontFamily: "'Sora',sans-serif",
          letterSpacing: -0.5
        }}>
          {currentRoleData.title}
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: T.textMid }}>
          {currentRoleData.subtitle}
        </p>
      </div>

      {saveSuccess && (
        <div style={{
          background: T.successBg,
          border: `1px solid #A7DFD0`,
          borderRadius: 12,
          padding: "12px 18px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          maxWidth: 800,
          width: "100%"
        }}>
          <Icon name="check" size={18} color={T.success} />
          <span style={{ fontSize: 13, color: T.success, fontWeight: 500 }}>
            Profile updated successfully!
          </span>
        </div>
      )}

      <div style={{
        background: T.white,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: 32,
        maxWidth: 800,
        width: "100%"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
          paddingBottom: 28,
          borderBottom: `1px solid ${T.border}`
        }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            disabled={!editMode}
            style={{ display: "none" }}
            id="profilePicInput"
          />
          <label
            htmlFor="profilePicInput"
            style={{
              position: "relative",
              cursor: editMode ? "pointer" : "default"
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: profilePic ? "none" : T.chalk,
                border: `2px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundImage: profilePic ? `url(${profilePic})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: 12
              }}
            >
              {!profilePic && (
                <Icon name="user" size={48} color={T.textSub} />
              )}
            </div>
            {editMode && (
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: T.navy,
                  color: T.white,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  fontFamily: "'DM Sans',sans-serif"
                }}
              >
                Click to change
              </div>
            )}
          </label>
          <div style={{ marginTop: editMode ? 50 : 0, textAlign: "center" }}>
            <h3 style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: T.navy,
              fontFamily: "'Sora',sans-serif"
            }}>
              {formData.name || "User"}
            </h3>
            <p style={{
              margin: "4px 0 0",
              fontSize: 12,
              color: T.textSub
            }}>
              {role === "scholar" ? formData.year : role === "trainer" ? formData.title : formData.position}
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: T.navy,
            fontFamily: "'Sora',sans-serif"
          }}>
            Personal Information
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: "8px 18px",
              background: editMode ? T.danger : T.navy,
              color: T.white,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans',sans-serif",
              transition: "all .2s"
            }}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {currentRoleData.fields.map((field, idx) => {
            if (field.type === "password") {
              return null;
            }

            return (
              <div key={field.name} style={{ marginBottom: 0 }}>
                <label style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.textSub,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 8
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!editMode}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    fontSize: 13,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    background: editMode ? T.white : T.chalk,
                    color: T.text,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: "none",
                    cursor: editMode ? "text" : "default"
                  }}
                />
              </div>
            );
          })}
        </div>

        {currentRoleData.fields.map((field) => {
          if (field.type === "password") {
            return (
              <div key={field.name} style={{ marginBottom: 28 }}>
                <label style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.textSub,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 8
                }}>
                  {field.label}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      paddingRight: 40,
                      fontSize: 13,
                      border: `1px solid ${T.border}`,
                      borderRadius: 8,
                      background: editMode ? T.white : T.chalk,
                      color: T.text,
                      fontFamily: "'DM Sans',sans-serif",
                      outline: "none",
                      cursor: editMode ? "text" : "default"
                    }}
                  />
                  {editMode && (
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      <Icon
                        name={showPassword ? "eye" : "eyeOff"}
                        size={16}
                        color={T.textSub}
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}

        {editMode && (
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "12px",
              background: T.navy,
              color: T.white,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Sora',sans-serif",
              boxShadow: `0 4px 20px ${T.shadow}`,
              transition: "all .2s"
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
