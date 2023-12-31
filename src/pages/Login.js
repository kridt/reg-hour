import React, { useContext } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import EnglishSwitch from "../components/EnglishSwitch";
import { LangContext } from "../context/LangContext";

export default function Login() {
  const { language } = useContext(LangContext);
  const [showHide, setShowHide] = React.useState(false); // this is for the password show/hide
  const navigate = useNavigate();

  /* function handleLogIn(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);

    auth.signInWithEmailAndPassword(data.email, data.password).then((user) => {
      navigate("/menu");
    });
  } */

  function handleLogIn(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    try {
      // Ask for permission to get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
              localStorage.setItem("latitude", position.coords.latitude);
              localStorage.setItem("longitude", position.coords.longitude);
              navigate("/menu");
            });
        },
        (error) => {
          console.log(error);
          auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
              navigate("/menu");
            });
        }
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <EnglishSwitch />
      {language ? (
        <>
          {/* english */}
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "2em",
                marginBottom: "2em",
              }}
            >
              Log in
            </h1>

            <form onSubmit={(e) => handleLogIn(e)}>
              <input
                style={{
                  width: "60%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                placeholder="Email"
                type="text"
                name="email"
              />

              <br />
              <br />
              <br />
              <div
                style={{
                  marginLeft: "20.75em",
                  marginBottom: ".25em",
                }}
              >
                <label htmlFor="showhide">Show Password: </label>
                <input
                  type="checkbox"
                  onChange={(e) => setShowHide(e.target.checked)}
                />
              </div>
              <input
                style={{
                  width: "60%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                placeholder="Password"
                type={showHide ? "text" : "password"}
                name="password"
              />
              <br />
              <br />
              <br />
              <button
                style={{
                  width: "30%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Dansk */}
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "2em",
                marginBottom: "2em",
              }}
            >
              Log ind
            </h1>

            <form onSubmit={(e) => handleLogIn(e)}>
              <input
                style={{
                  width: "60%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                placeholder="Email"
                type="text"
                name="email"
              />

              <br />
              <br />
              <br />

              <input
                style={{
                  width: "60%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                placeholder="Adgangskode"
                type="password"
                name="password"
              />
              <br />
              <br />
              <br />
              <button
                style={{
                  width: "30%",
                  margin: "0 auto",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0.5em",
                  boxSizing: "border-box",
                }}
                type="submit"
              >
                Log ind
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
