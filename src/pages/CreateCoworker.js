import React from "react";
import AdminNav from "../components/AdminNav";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateCoworker() {
  const navigateTo = useNavigate();

  function handleCreateCoworker(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      medarbejderNummer: parseInt(e.target.medarbejderNummer.value),
      email: e.target.email.value,
      password: e.target.password.value,
      timeLøn: parseFloat(e.target.løn.value.replace(",", ".")),
    };
    console.log(data);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        database
          .collection("users")
          .doc(userCredential.user.uid)
          .set({
            name: data.name,
            medarbejderNummer: data.medarbejderNummer,
            email: data.email,
            uid: userCredential.user.uid,
            timeLøn: data.timeLøn,
          })
          .then(() => {
            console.log("Document successfully written!");
            alert("Medarbejder oprettet");
            navigateTo("/admin");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            alert("Der skete en fejl, prøv igen");
          });
      });
  }

  return (
    <div>
      <AdminNav />
      <h1>CreateCoworker</h1>

      <form onSubmit={(e) => handleCreateCoworker(e)}>
        <label>Name:</label>
        <input type="text" name="name" />
        <br />
        <br />
        <br />
        <label>medarbejder Nummer</label>
        <input type="number" name="medarbejderNummer" />
        <br />
        <br />
        <br />
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
        <br />
        <label>Aftalt timeløn:</label>
        <input type="text" name="løn" />
        <br />
        <br />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
