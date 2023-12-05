import React from "react";
import { Audio } from "react-loader-spinner";

export default function LoadingScreen() {
  const style = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    opacity: "0.5",
  };

  return (
    <div style={style}>
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="black"
          ariaLabel="loading"
        />
      </div>
    </div>
  );
}
