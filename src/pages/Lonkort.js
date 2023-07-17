import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { Interval, eachDayOfInterval, set } from "date-fns";
import { da } from "date-fns/locale";

export default function Lonkort() {
  const navigate = useNavigate();
  const [currentPeriod, setCurrentPeriod] = useState([]);
  const [allStempel, setAllStempel] = useState([]);

  useEffect(() => {
    if (auth.currentUser?.uid === undefined) {
      navigate("/");
    }
    const dato = new Date().getDate();

    if (dato < 15) {
      setCurrentPeriod(
        eachDayOfInterval({
          start: new Date().setDate(new Date().getDate() - 31),
          end: new Date().setDate(15),
        })
      );
    } else {
      setCurrentPeriod(
        eachDayOfInterval({
          start: new Date().setDate(16),
          end: new Date().setDate(new Date().getDate() + 29),
        })
      );
    }

    database
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("stempel")
      .get()
      .then((snapshot) => {
        setAllStempel(snapshot);
      });
  }, []);

  return (
    <div>
      <Link to={"/stempling"}>Til stempling</Link>
      <h1>Lønkort</h1>
      <h2>Nuværende lønperiode</h2>
      <div>
        <h1>datoer</h1>
        {currentPeriod.map((date) => {
          const test = allStempel?.docs?.find(
            (doc) =>
              parseInt(doc.id) ===
              parseInt(date.toLocaleDateString().replaceAll(".", ""))
          );
          // console.log(test?.data().stemplingInd.time);
          return (
            <div style={{ borderBottom: "1px white solid", margin: "2em 0" }}>
              <p>{date.toLocaleDateString()}</p>
              <p>ind: {test?.data()?.stemplingInd?.time || null}</p>
              <p>ud: {test?.data()?.stemplingUd?.time || null}</p>
              <p>Hours after break: {/* brug date-fns durance function */} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
