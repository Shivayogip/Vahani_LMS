import { useState } from "react";
import { T } from "../theme";
import Icon from "./Icon";

const Field = ({ label, type = "text", placeholder, value, onChange, icon, options }) => {

  const [f, setF] = useState(false);

  return (
    <div style={{ marginBottom: 18 }}>

      {label && (
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            color: T.textMid,
            textTransform: "uppercase",
            letterSpacing: .8,
            marginBottom: 6,
            fontFamily: "'Sora',sans-serif"
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>

        {icon && (
          <span
            style={{
              position: "absolute",
              left: 13,
              top: "50%",
              transform: "translateY(-50%)"
            }}
          >
            <Icon name={icon} size={14} color={T.textSub} />
          </span>
        )}

        {type === "select" ? (
          <select
            value={value}
            onChange={onChange}
            onFocus={() => setF(true)}
            onBlur={() => setF(false)}
            style={{
              width: "100%",
              padding: icon ? "10px 14px 10px 38px" : "10px 14px",
              borderRadius: 10,
              border: `1.5px solid ${f ? T.navy : T.border}`,
              fontSize: 14,
              color: T.text,
              background: T.white,
              outline: "none",
              fontFamily: "'DM Sans',sans-serif",
              boxSizing: "border-box",
              boxShadow: f ? `0 0 0 3px ${T.navy}14` : "none",
              transition: "all .15s",
              appearance: "none"
            }}
          >
            <option value="">{placeholder || "Select option"}</option>
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setF(true)}
            onBlur={() => setF(false)}
            style={{
              width: "100%",
              padding: icon ? "10px 14px 10px 38px" : "10px 14px",
              borderRadius: 10,
              border: `1.5px solid ${f ? T.navy : T.border}`,
              fontSize: 14,
              color: T.text,
              background: T.white,
              outline: "none",
              fontFamily: "'DM Sans',sans-serif",
              boxSizing: "border-box",
              boxShadow: f ? `0 0 0 3px ${T.navy}14` : "none",
              transition: "all .15s"
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Field;