import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";

export default function Settings() {
  const [user, setUser] = useState(auth.currentUser);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    database
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name);
      });
  }, []);

  function changePassword(e) {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (newPassword === oldPassword) {
      alert("New password must be different from old password");
      return;
    }

    try {
      auth.currentUser.updatePassword(newPassword).then(() => {
        alert("Password changed successfully");
        navigate("/menu");
      });
    } catch (error) {
      alert("error, Did not change password, please log in again");
      navigate("/login");
    }
  }
  return (
    <div>
      <Link style={{ color: "white" }} to={"/menu"}>
        Tilbage
      </Link>
      <h1 style={{ textAlign: "center" }}>Settings</h1>

      <div>
        <p>name: {name}</p>
        <p>email: {user.email}</p>
      </div>
      <div>
        <h2>Change password</h2>
        <form onSubmit={(e) => changePassword(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "200px",
            }}
          >
            <label>New password:</label>
            <input type="password" name="newPassword" />
          </div>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "200px",
            }}
          >
            <label>Confirm new password:</label>
            <input type="password" name="confirmNewPassword" />
          </div>
          <br />
          <br />
          <button type="submit">Change password</button>
        </form>
      </div>
    </div>
  );
}
