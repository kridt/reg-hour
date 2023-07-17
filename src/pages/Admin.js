import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import AdminNav from "../components/AdminNav";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    database
      .collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAllUsers(users);
      });
  }, []);

  console.log(allUsers);

  return (
    <div>
      <AdminNav />
      <h1>Admin</h1>
    </div>
  );
}
