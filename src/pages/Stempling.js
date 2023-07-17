import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";

export default function Stempling({ user }) {
  /* const [currentDate, setCurrentDate] = useState(""); */

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser.uid === undefined) {
      navigate("/");
    }
  }, []);

  const [currentStempel, setCurrentStempel] = useState({
    dato: "",
    time: "",
    location: { latitude: "", longitude: "" },
    funktion: "",
  });

  useEffect(() => {
    const stempel = JSON.parse(localStorage.getItem("latestStempel"));
    setCurrentStempel(stempel);

    /* database
      .collection("users")
      .doc("kridt")
      .collection("stempel")
      .doc(todaysCode)
      .get()
      .then((doc) => {
        setCurrentStempel(doc.data());
      }); */
  }, []);

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
        .doc(auth?.currentUser?.uid)
        .collection("stempel")
        .doc(sixDigitDateCode)
        .set({
          stemplingInd: stempel,
        });
      localStorage.setItem("latestStempel", JSON.stringify(stempel));
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
        .doc(auth?.currentUser?.uid)
        .collection("stempel")
        .doc(sixDigitDateCode)
        .set({
          stemplingInd: currentStempel,
          stemplingUd: stempel,
        });
      localStorage.setItem("latestStempel", JSON.stringify(stempel));
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
