import React from "react";

export default function MobileFallback() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>Your device is in low-power mode or not supported for the 3D experience.</h1>
    </div>
  );
}
