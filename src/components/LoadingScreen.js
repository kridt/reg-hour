import React from "react";

export default function LoadingScreen() {
  const style = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: "0.5",
  };

  return <div style={style}>LoadingScreen</div>;
}
