import axios from "axios";
import React, { useState } from "react";
import { database } from "../firebase";

export default function MakeStempel({ coworkers }) {
  const [userLonperide, setUserLonperide] = useState([]);

  const url = process.env.REACT_APP_SERVER_URL;

  function setPeriode(e) {
    console.log(e.target.value);
    const uid = e.target.value.split("-")[1];
    if (uid) {
      database
        .collection("users")
        .doc(uid)
        .collection("lonperioder")
        .get()
        .then((doc) => {
          setUserLonperide(doc.docs);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const indud = e.target.indud.value;
    const coworker = e.target.coworker.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const uid = coworker.split("-")[1];
    const dateFormatted = date.split("-").reverse().join("-");
    const periode = e.target.periode.value;

    axios
      .post(`${url}/api/ekstrastempel/${indud}/${uid}`, {
        indud: indud,
        coworker: coworker,
        date: dateFormatted,
        time: time,
        periode: periode,
      })
      .then((res) => {
        console.log(res);
        alert("Stempel lavet");
      })
      .catch((err) => {
        console.log(err);
        alert("Der skete en fejl");
      });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="make">Lav stempel for medarbejder</label>

      <div className="flex">
        <div>
          <label htmlFor="ind">Ind</label>
          <input name="indud" type="radio" value={"ind"} />
        </div>
        <div>
          <label htmlFor="ud">Ud</label>
          <input name="indud" type="radio" value={"ud"} />
        </div>
      </div>

      <label htmlFor="coworker">Vælg medarbejder:</label>
      <input
        onBlur={(e) => setPeriode(e)}
        list="coworkers"
        name="coworker"
        id="coworker"
      />
      <datalist id="coworkers">
        {coworkers.map((coworker) => (
          <option
            value={coworker.name + "-" + coworker.uid}
            className={coworker.uid}
            itemRef={coworker.uid}
            key={coworker.uid}
          />
        ))}
      </datalist>
      <br />
      <br />

      <label htmlFor="periode">Vælg periode:</label>
      <select name="periode" id="periode">
        {userLonperide?.map((periode) => (
          <option value={periode.id} key={periode.id}>
            {periode.id}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="date">Vælg dato:</label>
        <input type="date" id="date" name="date" />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor="time">Vælg tidspunkt:</label>
        <input type="time" id="time" name="time" />
      </div>

      <button type="submit">Lav stempel</button>
    </form>
  );
}
