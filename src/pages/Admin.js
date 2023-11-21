import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);

  async function test() {
    try {
      const response = await axios.post(
        "http://localhost:6969/api/checkin/jfjdjjfd",
        {
          body: {
            medarbejderNummer: "1234",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

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

  return (
    <div>
      <AdminNav />
      <button onClick={() => test()}>test</button>
      <h1>Admin</h1>
      <h2>Liste med alle medarbejdere, tryk på dem for at ændre</h2>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Navn</p>
          <p>Medarbejder nummer</p>
          <p>Time løn</p>
        </div>
        {allUsers.map((user) => {
          return (
            <Link
              to={`/editCorworker/${user.medarbejderNummer}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#555",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2em",
                }}
                key={user.medarbejderNummer}
              >
                <p>{user.name}</p>
                <p>{user.medarbejderNummer}</p>
                <p>{user.timeLøn} kr</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
