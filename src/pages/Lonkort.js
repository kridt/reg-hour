import React from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";

export default function Lonkort() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );
  const daysInMonth = getAllDaysInMonth(currentMonth, currentYear);

  return (
    <div>
      <Link to={"/"}>Til stempling</Link>
      <h1>Lønkort</h1>
      <div>
        {daysInMonth.map((day) => {
          return (
            <div
              key={day}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                <p>{day.toLocaleDateString("da-DK", { weekday: "long" })} </p>
                <p>{day.toLocaleDateString("da-DK")}</p>
              </div>
              <div>
                <p>Stempling ind: </p>
                <p>Stempling ud: </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
