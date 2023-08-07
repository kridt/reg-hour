import React, { useEffect, useState } from "react";
import { database } from "../firebase";

export default function CoworkerInfoComp({ userId }) {
  const [stempel, setStempel] = useState([]);
  const [user, setUser] = useState({});
  const [totalWorkHours, setTotalWorkHours] = useState([]);
  const reducer = (accumulator) => accumulator.reduce((a, b) => a + b, 0);

  useEffect(() => {
    database
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setUser(doc.data());
      })
      .then(() => {
        database
          .collection("users")
          .doc(userId)
          .collection("stempel")
          .get()
          .then((snapshot) => {
            setStempel(snapshot.docs);
          })
          .then(() => {
            var totalWorkHours = [];

            stempel.forEach((doc) => {
              const stempelIn = doc.data().stemplingInd?.time;
              const stempelUd = doc.data().stemplingUd?.time;

              const startOfhoursInShift = parseInt(stempelIn?.split(".")[0]);
              const hoursAfterBreak = startOfhoursInShift + 0.5;
              const endTimeOfShift = parseInt(stempelUd?.split(".")[0]);

              var workHours = endTimeOfShift - hoursAfterBreak;

              totalWorkHours.push(workHours);
            });

            setTotalWorkHours(reducer(totalWorkHours));
          });
      });
  }, [userId]);
  console.log(totalWorkHours);

  return (
    <tr>
      <td>{user?.name}</td>
      <td>{user?.medarbejderNummer}</td>
      <td>{user?.timeLøn}</td>
      <td>{totalWorkHours}</td>
      <td>{totalWorkHours * user?.timeLøn}</td>
    </tr>
  );
}
