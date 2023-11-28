import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { LangContext } from "../context/LangContext";
import axios from "axios";
import { listOfDates } from "../components/GetListOfArrays";

export default function Stempling() {
  /* const [currentDate, setCurrentDate] = useState(""); */
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { language } = useContext(LangContext);
  const [loading, setLoading] = useState(false);
  var currentLocation = {
    latitude: localStorage.getItem("latitude"),
    longitude: localStorage.getItem("longitude"),
  };

  const [satStempel, setSatStempel] = useState({
    dato: "",
    time: "",
    funktion: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser.uid === undefined) {
      navigate("/");
    }
  }, [navigate]);

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
      }); 
      
      */
    console.log(auth.currentUser.uid);
  }, []);
  function handleSteplIn() {
    setLoading(true);
    console.log(currentLocation);
    try {
      axios
        .post(`${serverUrl}/api/checkin/${auth.currentUser.uid}`, {
          body: {
            medarbejderNummer: auth.currentUser.uid,
            location: currentLocation,
            time: new Date().toLocaleTimeString(),
            periode: listOfDates.nameOfPeriod,
          },
        })
        .then((response) => {
          console.log(response.data.data);

          setSatStempel({
            dato: response.data.dato,
            time: response.data.time,
            funktion: response.data.funktion,
            location: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
          });

          setLoading(false);
          alert("Du har stemplet ind");
        });
    } catch (error) {
      setLoading(false);
      alert("Du har ikke givet tilladelse til at bruge din lokation");
    }
    // localStorage.setItem("latestStempel", JSON.stringify(stempel));
    //setCurrentStempel(stempel);
  }

  function handleSteplOut() {
    setLoading(true);
    try {
      axios
        .post(`${serverUrl}/api/checkout/${auth.currentUser.uid}`, {
          body: {
            medarbejderNummer: auth.currentUser.uid,
            location: currentLocation,
            time: new Date().toLocaleTimeString(),
            periode: listOfDates.nameOfPeriod,
          },
        })
        .then((response) => {
          console.log(response.data);
          setSatStempel({
            dato: response.data.dato,
            time: response.data.time,
            funktion: response.data.function,
            location: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
          });
          setLoading(false);
          alert("Du har stemplet ud");
        });
    } catch (error) {
      setLoading(false);
      alert("Der skete en fejl, send en sms til 25 77 14 03");
    }
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
                backgroundColor: "black",
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
                backgroundColor: "black",
              }}
              onClick={() => handleSteplOut()}
            >
              Check out
            </button>
            <div style={{ margin: "1em" }}>
              <h2>Your last stamp</h2>
              <p>Function: {satStempel?.funktion}</p>
              <p>Date: {satStempel?.dato}</p>
              <p>Time: {satStempel?.time}</p>
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
                backgroundColor: "black",
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
                backgroundColor: "black",
              }}
              onClick={() => handleSteplOut()}
            >
              Stempl Ud
            </button>
            <div style={{ margin: "1em" }}>
              <h2>Dit seneste stempel</h2>
              <p>Funktion: {satStempel?.funktion}</p>
              <p>Dato: {satStempel?.dato}</p>
              <p>Tid: {satStempel?.time}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
