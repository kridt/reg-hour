import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignOutBut from "../components/SignOutBut";
import { auth } from "../firebase";
import { listOfDates } from "../components/GetListOfArrays";

export default function Menu() {
  const [admin, setAdmin] = useState(false);

  const test = listOfDates;

  console.log(test);

  useEffect(() => {
    auth?.currentUser?.uid === "onl32JzYaOPSOVofAU45o7HCzMs2"
      ? setAdmin(true)
      : setAdmin(false);
  }, []);

  return (
    <div>
      <SignOutBut />
      <h1 style={{ textAlign: "center" }}>Menu</h1>
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "0",
            alignItems: "center",
          }}
        >
          {admin ? (
            <>
              <li
                style={{
                  listStyle: "none",
                  backgroundColor: "#555",
                  padding: "1em 3em",
                }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
              <br />
              <br />
            </>
          ) : null}

          <li
            style={{
              listStyle: "none",
              backgroundColor: "#555",
              padding: "1em 3em",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/stempling"
            >
              Stempling
            </Link>
          </li>
          <br />
          <br />
          <li
            style={{
              listStyle: "none",
              backgroundColor: "#555",
              padding: "1em 3em",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/lonkort"
            >
              Lønkort
            </Link>
          </li>
          <br />
          <br />
          <li
            style={{
              listStyle: "none",
              backgroundColor: "#555",
              padding: "1em 3em",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/settings"}
            >
              settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
