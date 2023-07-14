import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";

export default function Stempling() {
  /* const [currentDate, setCurrentDate] = useState(""); */
  const todaysCode = new Date().toLocaleDateString().replaceAll(".", "");
  const [todaysStempel, setTodaysStempel] = React.useState();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [currentStempel, setCurrentStempel] = React.useState({
    dato: "",
    time: "",
    location: { latitude: "", longitude: "" },
    funktion: "",
  });

  useEffect(() => {
    database
      .collection("users")
      .doc("kridt")
      .collection("stempel")
      .doc(todaysCode)
      .get()
      .then((doc) => {
        setCurrentStempel(doc.data());
      });
  }, []);

  console.log(currentStempel);
  function handleSteplIn() {
    const sixDigitDateCode = new Date()
      .toLocaleDateString()
      .replaceAll(".", "");
    console.log(sixDigitDateCode);
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

      database
        .collection("users")
        .doc("kridt")
        .collection("stempel")
        .doc(sixDigitDateCode)
        .set({
          "stempling ind": stempel,
        });
      setCurrentStempel(stempel);
    });
  }

  function handleSteplOut() {
    const sixDigitDateCode = new Date()
      .toLocaleDateString()
      .replaceAll(".", "");
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
      database
        .collection("users")
        .doc("kridt")
        .collection("stempel")
        .doc(sixDigitDateCode)
        .set({
          "stempling ind": currentStempel,
          "stempling ud": stempel,
        });
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
      <p>Funktion: {currentStempel?.funktion}</p>
      <p>Dato: {currentStempel?.dato}</p>
      <p>Tid: {currentStempel?.time}</p>
      <p>Latitude: {currentStempel?.location?.latitude}</p>
      <p>Longitude: {currentStempel?.location?.longitude}</p>
    </div>
  );
}
