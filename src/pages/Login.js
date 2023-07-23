import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function handleLogIn(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);

    auth.signInWithEmailAndPassword(data.email, data.password).then((user) => {
      navigate("/menu");
    });
  }

  return (
    <div>
      <h1>Log ind</h1>

      <form onSubmit={(e) => handleLogIn(e)}>
        <label>Email:</label>
        <input type="text" name="email" />
        <br />
        <br />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <br />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
