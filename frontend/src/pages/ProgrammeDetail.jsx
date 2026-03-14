import { useState } from "react";
import { T } from "../theme";
import { PROGRAMMES, ASSIGNMENTS, RESOURCES, SCHOLARS } from "../data/data";
import englishCommImage from "../assets/speaking_the_english_why_english_is_so_difficult_to_learn_featured.jpg";
import Icon from "../components/Icon";
import Card from "../components/Card";

function ProgrammeDetail({ programmeId, onBack }) {
  const programme = PROGRAMMES.find(p => p.id === programmeId);
  const [activeTab, setActiveTab] = useState("posts");
  const [postText, setPostText] = useState("");

  if (!programme) return null;

  const programmeAssignments = ASSIGNMENTS.filter(a => a.programme === programme.name);
  const programmeResources = RESOURCES.filter(r => r.programme === programme.name);
  const programmeScholars = SCHOLARS.slice(0, 6);

  const posts = [
    { id: 1, author: "Dr. Sunita Rao", role: "Instructor", avatar: "SR", time: "2 hours ago", content: "Good morning everyone! Please make sure to complete the assignments by Friday. Let me know if you have any questions.", likes: 12, replies: 3 },
    { id: 2, author: "Aarav Mehta", role: "Scholar", avatar: "AM", time: "1 day ago", content: "Great session yesterday! The examples really helped clarify the concepts.", likes: 8, replies: 2 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <div>
            <Card>
              <div style={{ marginBottom: 24 }}>
                <textarea
                  placeholder="Share something with the class..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 14,
                    fontSize: 13,
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontFamily: "'DM Sans',sans-serif",
                    outline: "none",
                    resize: "none",
                    minHeight: 80
                  }}
                />
                <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
                  <button style={{
                    padding: "8px 16px",
                    background: "transparent",
                    color: T.navy,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif"
                  }}>
                    Cancel
                  </button>
                  <button style={{
                    padding: "8px 16px",
                    background: T.navy,
                    color: T.white,
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif"
                  }}>
                    Post
                  </button>
                </div>
              </div>

              {posts.map((post) => (
                <div key={post.id} style={{
                  padding: "16px 0",
                  borderBottom: `1px solid ${T.border}`
                }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: T.navy,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: T.white,
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {post.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{post.author}</span>
                        <span style={{ fontSize: 11, color: T.textSub }}>{post.role}</span>
                        <span style={{ fontSize: 11, color: T.textSub }}>• {post.time}</span>
                      </div>
                      <p style={{ margin: "8px 0 12px", fontSize: 13, color: T.text, lineHeight: 1.6 }}>
                        {post.content}
                      </p>
                      <div style={{ display: "flex", gap: 16 }}>
                        <button style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                          color: T.textSub
                        }}>
                          <Icon name="heart" size={14} color={T.textSub} />
                          {post.likes} Likes
                        </button>
                        <button style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                          color: T.textSub
                        }}>
                          <Icon name="mail" size={14} color={T.textSub} />
                          {post.replies} Replies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        );

      case "assignments":
        return (
          <Card>
            {programmeAssignments.length > 0 ? (
              programmeAssignments.map((assignment) => (
                <div key={assignment.id} style={{
                  padding: "16px",
                  marginBottom: 12,
                  background: T.chalk,
                  borderRadius: 10,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 4 }}>
                      {assignment.title}
                    </div>
                    <div style={{ fontSize: 12, color: T.textSub, display: "flex", gap: 12 }}>
                      <span>Due: {new Date(assignment.due).toLocaleDateString()}</span>
                      <span>{assignment.submitted}/{assignment.total} submitted</span>
                    </div>
                  </div>
                  <button style={{
                    padding: "8px 16px",
                    background: T.navy,
                    color: T.white,
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif"
                  }}>
                    View
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: T.textSub }}>
                No assignments yet
              </div>
            )}
          </Card>
        );

      case "resources":
        return (
          <Card>
            {programmeResources.length > 0 ? (
              programmeResources.map((resource) => (
                <div key={resource.id} style={{
                  padding: "16px",
                  marginBottom: 12,
                  background: T.chalk,
                  borderRadius: 10,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                    <Icon name="file" size={24} color={T.navy} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 2 }}>
                        {resource.title}
                      </div>
                      <div style={{ fontSize: 11, color: T.textSub}}>
                        {resource.type} • {resource.size}
                      </div>
                    </div>
                  </div>
                  <button style={{
                    padding: "8px 12px",
                    background: "transparent",
                    color: T.navy,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif"
                  }}>
                    Download
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: T.textSub }}>
                No resources yet
              </div>
            )}
          </Card>
        );

      case "members":
        return (
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {programmeScholars.map((scholar) => (
                <div key={scholar.id} style={{
                  padding: 14,
                  background: T.chalk,
                  borderRadius: 10,
                  border: `1px solid ${T.border}`,
                  textAlign: "center"
                }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: T.navy,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.white,
                    fontSize: 14,
                    fontWeight: 700,
                    margin: "0 auto 8px"
                  }}>
                    {scholar.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 2 }}>
                    {scholar.name}
                  </div>
                  <div style={{ fontSize: 11, color: T.textSub }}>
                    {scholar.year} Year
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: T.textSub }}>
              {programme.enrolled} total members
            </div>
          </Card>
        );

      case "about":
        return (
          <Card>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif" }}>
                Programme Details
              </h3>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.8 }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontWeight: 600 }}>Instructor:</span> {programme.trainer}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontWeight: 600 }}>Enrolled:</span> {programme.enrolled} / {programme.capacity} scholars
                </div>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontWeight: 600 }}>Completion:</span> {programme.completion}%
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Resources:</span> {programme.resources} files
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { key: "posts", label: "Posts", icon: "mail" },
    { key: "assignments", label: "Assignments", icon: "file" },
    { key: "resources", label: "Resources", icon: "book" },
    { key: "members", label: "Members", icon: "users" },
    { key: "about", label: "About", icon: "info" }
  ];

  return (
    <div style={{
      padding: 32,
      background: programme.name === "English Communication" ? `url(${englishCommImage})` : "auto",
      backgroundSize: programme.name === "English Communication" ? "cover" : "auto",
      backgroundPosition: programme.name === "English Communication" ? "center" : "auto",
      backgroundAttachment: programme.name === "English Communication" ? "fixed" : "auto",
      minHeight: "100vh"
    }}>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: programme.name === "English Communication" ? "rgba(255,255,255,0.9)" : "transparent",
          color: programme.name === "English Communication" ? T.navy : T.navy,
          border: `1px solid ${programme.name === "English Communication" ? "rgba(0,0,0,0.1)" : T.border}`,
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "'DM Sans',sans-serif",
          marginBottom: 24
        }}
      >
        <Icon name="chevL" size={14} color={T.navy} />
        Back to Programmes
      </button>

      <div style={{
        marginBottom: 28,
        background: programme.name === "English Communication" ? "rgba(255,255,255,0.95)" : "transparent",
        borderRadius: programme.name === "English Communication" ? 16 : 0,
        padding: programme.name === "English Communication" ? 16 : 0
      }}>
        <div style={{
          height: 120,
          background: `linear-gradient(135deg, ${programme.color}dd 0%, ${programme.color} 100%)`,
          borderRadius: 16,
          display: "flex",
          alignItems: "flex-end",
          padding: 24,
          marginBottom: 20
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: T.white,
              fontFamily: "'Sora',sans-serif",
              letterSpacing: -0.5
            }}>
              {programme.name}
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "rgba(255,255,255,.8)" }}>
              Instructor: {programme.trainer}
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: 20,
          padding: 20,
          background: T.white,
          borderRadius: 16,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'Sora',sans-serif" }}>
              {programme.enrolled}
            </div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>Enrolled</div>
          </div>
          <div style={{ height: 40, background: T.border, width: 1 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'Sora',sans-serif" }}>
              {programme.completion}%
            </div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>Completion</div>
          </div>
          <div style={{ height: 40, background: T.border, width: 1 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'Sora',sans-serif" }}>
              {programme.resources}
            </div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>Resources</div>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 24,
        borderBottom: programme.name === "English Communication" ? "none" : `1px solid ${T.border}`,
        overflow: "auto",
        background: programme.name === "English Communication" ? "rgba(255,255,255,0.95)" : "transparent",
        borderRadius: programme.name === "English Communication" ? 16 : 0,
        padding: programme.name === "English Communication" ? "0 16px 16px 16px" : "0",
        paddingBottom: programme.name === "English Communication" ? "16px" : "0"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "12px 16px",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.key ? `3px solid ${programme.color}` : "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? programme.color : T.textMid,
              fontFamily: "'DM Sans',sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              transition: "all .2s"
            }}
          >
            <Icon name={tab.icon} size={14} color={activeTab === tab.key ? programme.color : T.textMid} />
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{
        background: programme.name === "English Communication" ? "rgba(255,255,255,0.95)" : "transparent",
        borderRadius: programme.name === "English Communication" ? 16 : 0,
        padding: programme.name === "English Communication" ? 16 : 0
      }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProgrammeDetail;
