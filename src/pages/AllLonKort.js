import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { database } from "../firebase";
import CoworkerInfoComp from "../components/CoworkerInfoComp";

export default function AllLonKort() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    database
      .collection("users")
      .get()
      .then((snapshot) => {
        setAllUsers(snapshot.docs);
      });
  }, [setAllUsers]);

  /* function workHours(array) {
    const reducer = (accumulator) => accumulator.reduce((a, b) => a + b, 0);
    var totalWorkHours = [];

    array.forEach((stempel) => {
      const stempelIn = stempel?.stemplingInd?.time;
      const stempelUd = stempel?.stemplingUd?.time;
      const startOfhoursInShift = parseInt(stempelIn?.split(".")[0]);
      const hoursAfterBreak = startOfhoursInShift + 0.5;
      const endTimeOfShift = parseInt(stempelUd?.split(".")[0]);

      var workHours = endTimeOfShift - hoursAfterBreak;

      totalWorkHours.push(workHours);
    });

    return reducer(totalWorkHours);
  } */

  return (
    <div>
      <AdminNav />
      <h1>alle lønkort</h1>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Med nr</th>
            <th>Time løn</th>
            <th>Antal timer</th>
            <th>Løn ca</th>
          </tr>

          {allUsers?.map((user) => {
            return (
              <>
                <CoworkerInfoComp userId={user?.id} />
                <br />
              </>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
