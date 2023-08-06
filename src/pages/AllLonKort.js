import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { database } from "../firebase";

export default function AllLonKort() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    database
      .collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          var userData = doc.data();

          var pushData = {
            data: userData,
            id: doc.id,
            stemplinger: [],
            name: userData.name,
            medarbejderNummer: userData.medarbejderNummer,
            timeLøn: userData.timeLøn,
          };

          database
            .collection("users")
            .doc(doc.id)
            .collection("stempel")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                pushData.stemplinger.push(doc.data());
                pushData.totalWorkHours = workHours(pushData.stemplinger);
              });
            });
          //console.log(workHours(pushData.stemplinger));

          users.push(pushData);
        });

        setAllUsers(users);
        /* allUsers?.map((user) => {
          user.totalWorkHours = workHours(user.stemplinger);
        }); */
      });
  }, [setAllUsers]);

  function workHours(array) {
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
  }

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
            if (user?.totalWorkHours === undefined) {
              user.totalWorkHours = 0;
            }
            return (
              <>
                <tr key={user?.id}>
                  <td>{user?.name}</td>
                  <td>{user?.medarbejderNummer}</td>
                  <td>{user?.timeLøn}</td>
                  <td>{user?.totalWorkHours}</td>
                  <td>Løn ca</td>
                </tr>
                <br />
              </>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
