import { FormGroup, Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import english from "../img/english.jpg";
import dk from "../img/dk.png";
import { LangContext } from "../context/LangContext";

export default function EnglishSwitch() {
  const { language, setLanguage } = useContext(LangContext);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) {
      localStorage.setItem("language", "false");
    }
    if (language === "true") {
      setLanguage(true);
    } else {
      setLanguage(false);
    }
    console.log(language);
  }, [setLanguage]);

  function changeLang(value) {
    if (value === true) {
      localStorage.setItem("language", "true");
      setLanguage(true);
    } else {
      localStorage.setItem("language", "false");
      setLanguage(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "1em" }}>
      <div>
        <img width={25} src={dk} alt="english" />
      </div>
      <div>
        <Switch
          checked={language}
          onChange={(e) => changeLang(e.target.checked.valueOf())}
        />
      </div>
      <div>
        <img width={25} src={english} alt="english" />
      </div>
    </div>
  );
}
