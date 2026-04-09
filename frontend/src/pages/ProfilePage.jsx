import { useState, useEffect } from "react";
import { T } from "../theme";
import Icon from "../components/Icon";
import { apiFetch } from "../api";

function ProfilePage({ role = "scholar" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch("/api/users/profile");
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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

  const handleSave = async () => {
    try {
      const updated = await apiFetch("/api/users/profile", {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      setUser(updated);
      setSaveSuccess(true);
      setEditMode(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile");
    }
  };

  if (loading) return <div style={{ padding: 32 }}>Loading profile...</div>;
  if (!user) return <div style={{ padding: 32 }}>Profile not found.</div>;

  const roleLabels = {
    scholar: {
      title: "Scholar Profile",
      subtitle: "Manage your academic information",
      fields: [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email", disabled: true },
        { name: "year", label: "Year", type: "text" },
        { name: "programme", label: "Programme", type: "text" },
        { name: "batch", label: "Batch", type: "text" },
        { name: "attendance", label: "Attendance (%)", type: "number", disabled: true },
        { name: "score", label: "Overall Score", type: "number", disabled: true }
      ]
    },
    trainer: {
      title: "Trainer Profile",
      subtitle: "Manage your teaching information",
      fields: [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email", disabled: true },
        { name: "subject", label: "Subject", type: "text" },
        { name: "sessions", label: "Sessions Conducted", type: "number" },
        { name: "rating", label: "Trainer Rating", type: "number", disabled: true }
      ]
    },
    admin: {
      title: "Admin Profile",
      subtitle: "Manage your administrative information",
      fields: [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email", disabled: true }
      ]
    }
  };

  const currentRoleData = roleLabels[user.role] || roleLabels.scholar;

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
          fontFamily: "'Sora', sans-serif"
        }}>
          {currentRoleData.title}
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 16, color: T.textMid }}>
          {currentRoleData.subtitle}
        </p>
      </div>

      <div style={{ 
        width: "100%",
        maxWidth: 800,
        background: T.white,
        borderRadius: 24,
        boxShadow: `0 8px 32px ${T.shadow}`,
        overflow: "hidden",
        border: `1px solid ${T.border}`
      }}>
        {/* Profile Header */}
        <div style={{ 
          background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyL} 100%)`,
          height: 120,
          position: "relative"
        }} />
        
        <div style={{ padding: "0 40px 40px", marginTop: -60, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <div style={{ 
                width: 140, 
                height: 140, 
                borderRadius: "50%", 
                background: T.white,
                padding: 6,
                boxShadow: `0 4px 12px ${T.shadowMd}`
              }}>
                <div style={{ 
                  width: "100%", 
                  height: "100%", 
                  borderRadius: "50%", 
                  background: T.chalk,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56,
                  fontWeight: 800,
                  color: T.navy,
                  overflow: "hidden"
                }}>
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : user.name?.charAt(0)}
                </div>
              </div>
              {editMode && (
                <label style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: T.sun,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: `0 2px 8px ${T.shadow}`
                }}>
                  <Icon name="pencil" size={16} color={T.navy} />
                  <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
                </label>
              )}
            </div>

            <div style={{ flex: 1, paddingBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'Sora', sans-serif" }}>
                    {user.name}
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: T.textSub, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="mail" size={12} color={T.textSub} /> {user.email}
                  </p>
                </div>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 12,
                      border: `1.5px solid ${T.border}`,
                      background: T.white,
                      color: T.navy,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                      transition: "all .2s"
                    }}
                  >
                    <Icon name="pencil" size={14} color={T.navy} /> Edit Profile
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button 
                      onClick={() => { setEditMode(false); setFormData(user); }}
                      style={{
                        padding: "10px 20px",
                        borderRadius: 12,
                        border: `1.5px solid ${T.border}`,
                        background: T.white,
                        color: T.textMid,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: 14
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      style={{
                        padding: "10px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: T.navy,
                        color: T.white,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: 14,
                        boxShadow: `0 4px 12px ${T.navy}44`
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {saveSuccess && (
            <div style={{ 
              marginBottom: 24, 
              padding: "12px 16px", 
              background: T.successBg, 
              color: T.success, 
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              fontWeight: 600,
              border: `1px solid ${T.success}44`
            }}>
              <Icon name="check" size={16} color={T.success} /> Profile updated successfully!
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
            {currentRoleData.fields.map(field => (
              <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ 
                  fontSize: 12, 
                  fontWeight: 800, 
                  color: T.textSub, 
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: "'Sora', sans-serif"
                }}>
                  {field.label}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    name={field.name}
                    type={field.type === "password" && showPassword ? "text" : field.type}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    disabled={!editMode || field.disabled}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: `1.5px solid ${editMode && !field.disabled ? T.navy : T.border}`,
                      background: editMode && !field.disabled ? T.white : T.chalk,
                      color: T.text,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all .2s"
                    }}
                  />
                  {field.type === "password" && (
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: T.textSub
                      }}
                    >
                      <Icon name="eye" size={16} color={T.textSub} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
