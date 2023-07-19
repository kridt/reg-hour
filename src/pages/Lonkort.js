import React, { useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { eachDayOfInterval, intervalToDuration } from "date-fns";

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
          const stempelIn = test?.data()?.stemplingInd?.time;
          const stempelUd = test?.data()?.stemplingUd?.time;
          /* const minusBreak = intervalToDuration({
            start: new Date().getHours(stempelIn),
            end: new Date().getHours(stempelUd),
          }); */
          const startOfhoursInShift = parseInt(
            test?.data()?.stemplingInd?.time.split(".")[0]
          );
          const hoursAfterBreak = startOfhoursInShift + 0.5;
          const endTimeOfShift = parseInt(
            test?.data()?.stemplingUd?.time.split(".")[0]
          );

          var workHours = endTimeOfShift - hoursAfterBreak;

          if (!workHours) {
            workHours = 0;
          }
          return (
            <div
              key={date.id}
              style={{ borderBottom: "1px white solid", margin: "2em 0" }}
            >
              <p>{date.toLocaleDateString()}</p>
              <p>ind: {stempelIn || null}</p>
              <p>ud: {stempelUd || null}</p>
              <p>Hours after break: {workHours} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
