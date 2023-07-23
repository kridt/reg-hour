import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { eachDayOfInterval } from "date-fns";

export default function Lonkort() {
  const navigate = useNavigate();
  const [currentPeriod, setCurrentPeriod] = useState([]);
  const [allStempel, setAllStempel] = useState([]);
  const [totalWorkHours, setTotalWorkHours] = useState(0);

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
          end: new Date().setDate(new Date().getDate() + 24),
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
        var totalWorkHours = [];

        snapshot.docs.forEach((doc) => {
          const stempelIn = doc.data().stemplingInd?.time;
          const stempelUd = doc.data().stemplingUd?.time;

          const startOfhoursInShift = parseInt(stempelIn?.split(".")[0]);
          const hoursAfterBreak = startOfhoursInShift + 0.5;
          const endTimeOfShift = parseInt(stempelUd?.split(".")[0]);

          var workHours = endTimeOfShift - hoursAfterBreak;

          totalWorkHours.push(workHours);
        });

        const reducer = (accumulator) => accumulator.reduce((a, b) => a + b, 0);

        setTotalWorkHours(reducer(totalWorkHours));
      });
  }, [navigate]);

  return (
    <div>
      <Link style={{ color: "white" }} to={"/menu"}>
        Tilbage
      </Link>

      <h2>Nuværende lønperiode</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ flex: "1" }}>Dato</p>
        <div
          style={{ display: "flex", justifyContent: "space-evenly", flex: "1" }}
        >
          <p>Ind</p>
          <p>Ud</p>
        </div>
      </div>
      <div>
        {currentPeriod.map((date) => {
          const test = allStempel?.docs?.find(
            (doc) =>
              parseInt(doc.id) ===
              parseInt(date.toLocaleDateString().replaceAll(".", ""))
          );
          const stempelIn = test?.data()?.stemplingInd?.time;
          const stempelUd = test?.data()?.stemplingUd?.time;

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
              style={{
                borderBottom: "1px white solid",
                margin: "2em 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ flex: "1" }}>{date.toLocaleDateString()}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flex: "1",
                }}
              >
                <p>{stempelIn || null}</p>
                <p>{stempelUd || null}</p>
              </div>
              {/* <p>Hours after break: {workHours} </p> */}
            </div>
          );
        })}
      </div>
      <div
        style={{
          backgroundColor: "#444",
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
        }}
      >
        <h2>total hours: {totalWorkHours}</h2>
      </div>
    </div>
  );
}
