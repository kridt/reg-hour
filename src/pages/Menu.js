import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignOutBut from "../components/SignOutBut";
import { auth } from "../firebase";
import { LangContext } from "../context/LangContext";
import EnglishSwitch from "../components/EnglishSwitch";

export default function Menu() {
  const [admin, setAdmin] = useState(false);

  const { language } = useContext(LangContext);

  useEffect(() => {
    auth?.currentUser?.uid === "onl32JzYaOPSOVofAU45o7HCzMs2"
      ? setAdmin(true)
      : setAdmin(false);
  }, []);

  return (
    <>
      {language ? (
        <>
          {/* English */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <SignOutBut />
              <EnglishSwitch />
            </div>
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
                    Stamping
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
                    Salery Card
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
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <SignOutBut />
              <EnglishSwitch />
            </div>
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
                    Instillinger
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
