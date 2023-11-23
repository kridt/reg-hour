import React from "react";
import { listOfDates } from "../components/GetListOfArrays";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import SaleryCard from "../components/SaleryCard";

export default function Lonkort() {
  let currentPeriod = listOfDates;

  function SalaryCard({ date }) {}
  return (
    <div>
      <Link to="/menu" style={{ color: "white" }}>
        Tilbage
      </Link>
      <h1>Lønkort</h1>

      <h2 className="text-3xl font-bold">
        Nuværende Periode: {currentPeriod.nameOfPeriod}
      </h2>

      {currentPeriod.dates.map((date) => (
        <div key={date}>
          <SaleryCard date={date} />
        </div>
      ))}
    </div>
  );
}
