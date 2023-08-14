import React, { useContext } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../context/LangContext";

export default function SignOutBut() {
  const navigate = useNavigate();
  const { language } = useContext(LangContext);

  return (
    <button
      onClick={() => {
        auth?.signOut();
        navigate("/");
      }}
    >
      {language ? "Sign out" : "Log ud"}
    </button>
  );
}
