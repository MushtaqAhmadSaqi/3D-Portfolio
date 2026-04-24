import React from "react";
import { useStore } from "../utils/useStore";

export default function EnterOverlay() {
  const setEntered = useStore((s) => s.setEntered);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(11, 17, 32, 0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 900
    }}>
      <h1 style={{ marginBottom: "2rem" }}>MUSHTAQ AHMAD SAQI</h1>
      <button 
        onClick={() => setEntered(true)}
        style={{
          padding: "1rem 2rem",
          background: "transparent",
          border: "2px solid #38bdf8",
          color: "#38bdf8",
          cursor: "pointer",
          fontSize: "1.2rem"
        }}
      >
        ENTER EXPERIENCE
      </button>
    </div>
  );
}
