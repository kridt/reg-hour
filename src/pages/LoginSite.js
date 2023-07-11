import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSite() {
  const navigate = useNavigate();

  function handleLogin(value) {
    if (value.length === 6) {
      fetch("/medarbejdere.json")
        .then((response) => response.json())
        .then((data) => {
          const loggedInUser = data.find(
            (user) => user.personId === parseInt(value)
          );

          if (loggedInUser) {
            console.log("User found", loggedInUser);
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            navigate("/rutineliste/" + loggedInUser.personId);
          } else {
            alert("Forkert lønnummer");
          }
        });
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Log ind med dit lønnummer</h2>

      <input type="tel" onChange={(e) => handleLogin(e.target.value)} />

      <div>
        <br />
        <br />
        <br />
        <br />
        <h3>Du kan logge ind på din telefon her</h3>
        <img
          src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Frutineliste.vercel.app&chs=180x180&choe=UTF-8&chld=L|2"
          alt="qr code"
        />
      </div>
    </div>
  );
}
