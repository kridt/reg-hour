import React from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";

export default function Stempling() {
  /* const [currentDate, setCurrentDate] = useState(""); */
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [currentStempel, setCurrentStempel] = React.useState({
    dato: "",
    time: "",
    location: { latitude: "", longitude: "" },
    funktion: "",
  });
  const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );
  const daysInMonth = getAllDaysInMonth(currentMonth, currentYear);

  console.log(daysInMonth);

  function handleSteplIn() {
    navigator.geolocation.getCurrentPosition((position) => {
      const time = new Date().toLocaleTimeString("da-DK");
      const dato = new Date().toLocaleDateString("da-DK");
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const stempel = {
        funktion: "stempling ind",
        dato,
        time,
        location,
      };
      setCurrentStempel(stempel);
    });
  }

  function handleSteplOut() {
    navigator.geolocation.getCurrentPosition((position) => {
      const time = new Date().toLocaleTimeString("da-DK");
      const dato = new Date().toLocaleDateString("da-DK");
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const stempel = {
        funktion: "stempling ud",
        dato,
        time,
        location,
      };
      setCurrentStempel(stempel);
    });
  }
  return (
    <div>
      <Link to={"/lonkort"}>Til lonkort</Link>
      <h1>Stempling</h1>
      <button onClick={() => handleSteplIn()}>Stempl ind</button>
      <button onClick={() => handleSteplOut()}>Stepl Ud</button>
      <h2>Dit seneste stempel</h2>
      <p>Funktion: {currentStempel.funktion}</p>
      <p>Dato: {currentStempel.dato}</p>
      <p>Tid: {currentStempel.time}</p>
      <p>Latitude: {currentStempel.location.latitude}</p>
      <p>Longitude: {currentStempel.location.longitude}</p>
    </div>
  );
}
