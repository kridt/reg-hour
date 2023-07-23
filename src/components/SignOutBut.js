import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SignOutBut() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        auth?.signOut();
        navigate("/");
      }}
    >
      Log Ud
    </button>
  );
}
