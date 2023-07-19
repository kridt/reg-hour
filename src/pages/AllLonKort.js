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
          };

          database
            .collection("users")
            .doc(doc.id)
            .collection("stempel")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                pushData.stemplinger.push(doc.data());
              });
            });

          users.push(pushData);
        });
        setAllUsers(users);
      });
  }, []);
  console.log(allUsers);
  return (
    <div>
      <AdminNav />
      <h1>alle lønkort</h1>
    </div>
  );
}
