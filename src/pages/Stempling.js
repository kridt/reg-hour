import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { LangContext } from "../context/LangContext";
import { set } from "date-fns/esm";
import { alertTitleClasses } from "@mui/material";

export default function Stempling({ user }) {
  /* const [currentDate, setCurrentDate] = useState(""); */
  const [dagensKodeTest, setDagensKodeTest] = useState("14!09!2021");
  const { language } = useContext(LangContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser.uid === undefined) {
      navigate("/");
    }

    /* fetch("https://reghour-express.vercel.app/api/getDagensKode")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.dagensKode);
        setDagensKodeTest(data.dagensKode.replaceAll("-", "!"));
      });
      */
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
    setLoading(true);
    if (currentStempel?.funktion === "stempling ind") {
      if (
        window.confirm("Du har allerede stemplet ind, vil du stemple ind igen?")
      ) {
      } else {
        return;
      }
    }
    /* const sixDigitDateCode = new Date()
      .toLocaleDateString()
      .replaceAll(".", "-");
      console.log(sixDigitDateCode); */

    /*  navigator.geolocation.getCurrentPosition((position) => {
        const time = new Date().toLocaleTimeString("da-DK");
        const dato = new Date().toLocaleDateString("da-DK");
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      }); */

    /* const stempel = {
        funktion: "stempling ind",
        dato,
        time,
        location,
      };
 */
    try {
      database
        .collection("users")
        .doc(auth?.currentUser?.uid)
        .collection("stempel")
        .doc(dagensKodeTest)
        .set({
          stemplingInd: "yes",
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      alert("Du har ikke givet tilladelse til at bruge din lokation");
    }
    // localStorage.setItem("latestStempel", JSON.stringify(stempel));
    //setCurrentStempel(stempel);
  }

  function handleSteplOut() {
    if (currentStempel?.funktion === "stempling ud") {
      if (
        window.confirm(
          "Du har allerede stemplet ud, vil du stemple ud igen? dette vil slette dit seneste stempel"
        )
      ) {
      } else {
        return;
      }
    }

    const sixDigitDateCode = new Date()
      .toLocaleDateString()
      .replaceAll(".", "-");
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
        .doc(dagensKodeTest)
        .set({
          stemplingInd: currentStempel,
          stemplingUd: stempel,
        });
      localStorage.setItem("latestStempel", JSON.stringify(stempel));
      setCurrentStempel(stempel);
    });
  }
  return (
    <>
      {language ? (
        <>
          <div>
            <Link style={{ color: "white" }} to={"/menu"}>
              Back
            </Link>
            <h1 style={{ textAlign: "center" }}>Stamping</h1>
            {loading ? (
              <>
                <h1>Loading</h1>
              </>
            ) : null}
            <button
              style={{
                display: "block",
                margin: "0 auto",
                width: "90%",
                height: "3em",
              }}
              onClick={() => handleSteplIn()}
            >
              Check in
            </button>
            <br />
            <button
              style={{
                display: "block",
                margin: "0 auto",
                width: "90%",
                height: "3em",
              }}
              onClick={() => handleSteplOut()}
            >
              Check out
            </button>
            <div style={{ margin: "1em" }}>
              <h2>Your last stamp</h2>
              <p>Function: {currentStempel?.funktion}</p>
              <p>Date: {currentStempel?.dato}</p>
              <p>Time: {currentStempel?.time}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link style={{ color: "white" }} to={"/menu"}>
              Tilbage
            </Link>
            <h1 style={{ textAlign: "center" }}>Stempling</h1>
            <button
              style={{
                display: "block",
                margin: "0 auto",
                width: "90%",
                height: "3em",
              }}
              onClick={() => handleSteplIn()}
            >
              Stempl ind
            </button>
            <br />
            <button
              style={{
                display: "block",
                margin: "0 auto",
                width: "90%",
                height: "3em",
              }}
              onClick={() => handleSteplOut()}
            >
              Stempl Ud
            </button>
            <div style={{ margin: "1em" }}>
              <h2>Dit seneste stempel</h2>
              <p>Funktion: {currentStempel?.funktion}</p>
              <p>Dato: {currentStempel?.dato}</p>
              <p>Tid: {currentStempel?.time}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
