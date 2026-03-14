import { T } from "../theme";
import { ASSIGNMENTS } from "../data/data";

import Card from "../components/Card";
import Icon from "../components/Icon";
import Pill from "../components/Pill";
import Bar from "../components/Bar";


function AssignmentDetail({ assignmentId, onBack, role }) {
  const assignment = ASSIGNMENTS.find((item) => item.id === assignmentId);

  if (!assignment) return null;

  const dueDate = new Date(`${assignment.due}T${assignment.dueTime || "23:59"}`);
  const isScholar = role === "scholar";
  const isClosed = assignment.status === "Closed";
  const isHandedIn = assignment.submissionState === "Handed in";
  const submissionPct = Math.round((assignment.submitted / assignment.total) * 100);

  const dueDateLabel = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(dueDate);

  const dueTimeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(dueDate);

  const primaryButtonLabel = isScholar
    ? isHandedIn
      ? "View Submission"
      : isClosed
        ? "Closed"
        : "Hand In"
    : "Review Submissions";

  const primaryButtonDisabled = isScholar && isClosed && !isHandedIn;

  const topChipStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: T.white,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans',sans-serif"
  };

  const secondaryButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 14px",
    background: T.white,
    color: T.navy,
    border: `1.5px solid ${T.border}`,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'DM Sans',sans-serif"
  };

  const primaryButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 18px",
    background: primaryButtonDisabled ? T.skyL : T.sun,
    color: primaryButtonDisabled ? T.textSub : T.navyD,
    border: "none",
    borderRadius: 12,
    cursor: primaryButtonDisabled ? "not-allowed" : "pointer",
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "'DM Sans',sans-serif",
    boxShadow: primaryButtonDisabled ? "none" : `0 12px 24px ${T.shadow}`
  };

  const statCardStyle = {
    padding: 16,
    borderRadius: 16,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)"
  };

  const metaRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "12px 0",
    borderBottom: `1px solid ${T.border}`
  };

  return (
    <div style={{ padding: 32 }}>
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          background: T.white,
          color: T.navy,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'DM Sans',sans-serif",
          marginBottom: 22,
          boxShadow: `0 4px 14px ${T.shadow}`
        }}
      >
        <Icon name="chevL" size={14} color={T.navy} />
        Back to Assignments
      </button>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyL} 100%)`,
          borderRadius: 28,
          padding: 28,
          marginBottom: 24,
          boxShadow: `0 20px 46px ${T.shadowMd}`
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -30,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -90,
            right: 120,
            width: 190,
            height: 190,
            borderRadius: "50%",
            background: "rgba(245,200,66,0.12)"
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 22
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={topChipStyle}>{assignment.programme}</span>
              <span style={topChipStyle}>
                <Icon name="clock" size={13} color={T.white} />
                {assignment.submissionState}
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <Pill label={assignment.status} v={assignment.status === "Open" ? "success" : "default"} />
              <button style={primaryButtonStyle} disabled={primaryButtonDisabled}>
                <Icon name={isScholar ? "upload" : "eye"} size={14} color={primaryButtonDisabled ? T.textSub : T.navyD} />
                {primaryButtonLabel}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              alignItems: "end"
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 10px",
                  fontSize: 34,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: T.white,
                  fontFamily: "'Sora',sans-serif",
                  letterSpacing: -0.7
                }}
              >
                {assignment.title}
              </h1>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  color: "rgba(255,255,255,0.82)",
                  fontSize: 14
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Icon name="cal" size={14} color="rgba(255,255,255,0.82)" />
                  Due {dueDateLabel}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Icon name="clock" size={14} color="rgba(255,255,255,0.82)" />
                  {dueTimeLabel}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12
              }}
            >
              <div style={statCardStyle}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.6 }}>
                  Points
                </div>
                <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800, color: T.white, fontFamily: "'Sora',sans-serif" }}>
                  {assignment.points == null ? "No points" : `${assignment.points} pts`}
                </div>
              </div>

              <div style={statCardStyle}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.6 }}>
                  Submissions
                </div>
                <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800, color: T.white, fontFamily: "'Sora',sans-serif" }}>
                  {assignment.submitted}/{assignment.total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          alignItems: "start"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textSub, letterSpacing: 0.7, textTransform: "uppercase", marginBottom: 10 }}>
              Instructions
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif", marginBottom: 12 }}>
              What to complete
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: T.textMid }}>
              {assignment.instructions}
            </p>

            <div style={{ marginTop: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 12 }}>
                Submission checklist
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {assignment.checklist.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: 12,
                      borderRadius: 12,
                      background: T.chalk,
                      border: `1px solid ${T.border}`
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: T.successBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Icon name="check" size={12} color={T.success} />
                    </div>
                    <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.5 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.textSub, letterSpacing: 0.7, textTransform: "uppercase", marginBottom: 8 }}>
                  {isScholar ? "My Work" : "Submission Inbox"}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif" }}>
                  {isScholar ? "Drafts and attached files" : "Track learner submissions"}
                </div>
              </div>

              {isScholar ? (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={secondaryButtonStyle}>
                    <Icon name="upload" size={14} color={T.navy} />
                    Attach File
                  </button>
                  <button style={secondaryButtonStyle}>
                    <Icon name="plus" size={14} color={T.navy} />
                    New Note
                  </button>
                </div>
              ) : (
                <button style={secondaryButtonStyle}>
                  <Icon name="doc" size={14} color={T.navy} />
                  Export List
                </button>
              )}
            </div>

            {isScholar && (
              <div style={{ fontSize: 12, color: T.textSub, marginBottom: 16 }}>
                Accepted formats: PDF, DOCX, PPTX, XLSX
              </div>
            )}

            {assignment.myWork.length > 0 ? (
              <div style={{ display: "grid", gap: 12 }}>
                {assignment.myWork.map((file) => (
                  <div
                    key={file.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: 14,
                      borderRadius: 14,
                      background: T.chalk,
                      border: `1px solid ${T.border}`
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: `${T.navy}12`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        <Icon name="doc" size={16} color={T.navy} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: 12, color: T.textSub, marginTop: 3 }}>
                          {file.size} · {file.updated}
                        </div>
                      </div>
                    </div>
                    <button style={secondaryButtonStyle}>
                      <Icon name="eye" size={13} color={T.navy} />
                      View
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: 20,
                  borderRadius: 16,
                  background: T.chalk,
                  border: `1px dashed ${T.border}`,
                  fontSize: 13,
                  color: T.textMid,
                  lineHeight: 1.6
                }}
              >
                {isScholar
                  ? "No files attached yet. Start a draft or upload your work before the due date."
                  : "Submissions will appear here as scholars start handing in their work."}
              </div>
            )}
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textSub, letterSpacing: 0.7, textTransform: "uppercase", marginBottom: 10 }}>
              Snapshot
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif", marginBottom: 6 }}>
              Assignment details
            </div>

            <div style={metaRowStyle}>
              <span style={{ fontSize: 13, color: T.textSub }}>Programme</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, textAlign: "right" }}>{assignment.programme}</span>
            </div>
            <div style={metaRowStyle}>
              <span style={{ fontSize: 13, color: T.textSub }}>Due</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy, textAlign: "right" }}>{dueDateLabel} · {dueTimeLabel}</span>
            </div>
            <div style={metaRowStyle}>
              <span style={{ fontSize: 13, color: T.textSub }}>Status</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{assignment.status}</span>
            </div>
            <div style={metaRowStyle}>
              <span style={{ fontSize: 13, color: T.textSub }}>Submission</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{assignment.submissionState}</span>
            </div>
            <div style={{ ...metaRowStyle, borderBottom: "none", paddingBottom: 0 }}>
              <span style={{ fontSize: 13, color: T.textSub }}>Points</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>
                {assignment.points == null ? "No points" : `${assignment.points} points`}
              </span>
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textSub, letterSpacing: 0.7, textTransform: "uppercase", marginBottom: 10 }}>
              {isScholar ? "Ready Check" : "Class Progress"}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, fontFamily: "'Sora',sans-serif", marginBottom: 14 }}>
              {isScholar ? "Before you submit" : "Submission coverage"}
            </div>

            {isScholar ? (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ padding: 12, borderRadius: 12, background: T.chalk, border: `1px solid ${T.border}`, fontSize: 13, color: T.textMid }}>
                  Review the checklist and ensure your file names are clear before handing in.
                </div>
                <div style={{ padding: 12, borderRadius: 12, background: T.chalk, border: `1px solid ${T.border}`, fontSize: 13, color: T.textMid }}>
                  You can attach supporting files now and submit once everything is ready.
                </div>
                <div style={{ padding: 12, borderRadius: 12, background: T.chalk, border: `1px solid ${T.border}`, fontSize: 13, color: T.textMid }}>
                  Late or incomplete work may need mentor approval after the deadline.
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: T.textSub }}>Submitted so far</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{assignment.submitted}/{assignment.total} ({submissionPct}%)</span>
                </div>
                <Bar pct={submissionPct} color={submissionPct > 80 ? T.success : submissionPct > 50 ? T.sun : T.danger} h={6} />
                <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
                  <div style={{ padding: 12, borderRadius: 12, background: T.chalk, border: `1px solid ${T.border}`, fontSize: 13, color: T.textMid }}>
                    {assignment.total - assignment.submitted} learners still need to submit.
                  </div>
                  <div style={{ padding: 12, borderRadius: 12, background: T.chalk, border: `1px solid ${T.border}`, fontSize: 13, color: T.textMid }}>
                    Review early submissions to spot quality or support gaps before the deadline.
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetail;
