import React from "react";

export default function LoadingScreen() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b1120",
      color: "#38bdf8",
      zIndex: 1000
    }}>
      <h1>LOADING...</h1>
    </div>
  );
}
