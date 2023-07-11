import React from "react";
import { useNavigate } from "react-router-dom";

export default function Rutineliste() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const setDayOfTheWeek = new Date().toLocaleDateString("da-DK", {
    weekday: "long",
  });

  console.log(setDayOfTheWeek);
  function handleLogOff() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }
  return (
    <div>
      <button onClick={() => handleLogOff()}>Log af</button>
      <h1>Velkommen {loggedInUser.navn}</h1>
      <h1>Rutineliste</h1>
      <h2>{setDayOfTheWeek}</h2>
    </div>
  );
}
