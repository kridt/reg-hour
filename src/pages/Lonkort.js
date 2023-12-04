import React, { useContext, useEffect, useState } from "react";
import { getDatesBetween, listOfDates } from "../components/GetListOfArrays";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import SaleryCard from "../components/SaleryCard";
import FixedTotalHourBar from "../components/FixedTotalHourBar";
import { LangContext } from "../context/LangContext";

export default function Lonkort() {
  let [currentPeriod, setCurrentPeriod] = useState(listOfDates);
  const [choosePeriod, setChoosePeriod] = useState([]);
  const { language } = useContext(LangContext);
  useEffect(() => {
    database
      .collection("/users")
      .doc(auth?.currentUser?.uid)
      .collection("lonperioder")
      .get()
      .then((doc) => {
        let periodeToRemove = doc.docs.findIndex(
          (item) => item.id === currentPeriod.nameOfPeriod
        );

        if (periodeToRemove !== -1) {
          var removed = doc.docs.splice(periodeToRemove, 1);
        }
        setChoosePeriod([removed, ...doc.docs]);
      });
  }, [currentPeriod.nameOfPeriod]);
  Notification.requestPermission().then(function (result) {
    console.log(result);
    if (result === "granted") {
      new Notification("You have a new message");
    }
  });

  //console.log(getDatesBetween(new Date(1970, 0, 16), new Date(2027, 1, 15)));
  function chooseAnotherPeriode(e) {
    const chosenPeriod = e.target.value;

    const parts = chosenPeriod?.split("-");
    const formattedStart = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedEnd = new Date(parts[5], parts[4] - 1, parts[3]);
    const formatted = getDatesBetween(formattedStart, formattedEnd);
    setCurrentPeriod(formatted);
  }

  return language ? (
    <div>
      <Link to="/menu" style={{ color: "white" }}>
        Back
      </Link>
      <h1 className="text-3xl font-bold m-5">Lønkort</h1>

      <p>Current Periode: {currentPeriod.nameOfPeriod}</p>

      <p className="mt-3">Choose A periode</p>
      <select
        onChange={(e) => chooseAnotherPeriode(e)}
        className="text-black mb-3"
        defaultValue={currentPeriod?.nameOfPeriod}
      >
        {choosePeriod.map((period) => {
          return (
            <option className="text-black" key={period?.id}>
              {period?.id || period?.nameOfPeriod}
            </option>
          );
        })}
      </select>
      <div className="flex">
        <p className="w-1/2">Check In</p>
        <p className="w-1/2">Check Out</p>
      </div>
      <div className="mb-20">
        {currentPeriod?.dates.map((date) => {
          return (
            <div key={date}>
              <SaleryCard
                date={date}
                nameOfPeriod={currentPeriod?.nameOfPeriod}
              />
            </div>
          );
        })}
      </div>
      <FixedTotalHourBar periode={currentPeriod} />
    </div>
  ) : (
    <div>
      <Link to="/menu" style={{ color: "white" }}>
        Tilbage
      </Link>
      <h1 className="text-3xl font-bold m-5">Lønkort</h1>

      <p>Nuværende periode: {currentPeriod.nameOfPeriod}</p>

      <p className="mt-3">Vælg en periode</p>
      <select
        onChange={(e) => chooseAnotherPeriode(e)}
        className="text-black mb-3"
        defaultValue={currentPeriod?.nameOfPeriod}
      >
        {choosePeriod.map((period) => {
          return (
            <option className="text-black" key={period?.id}>
              {period?.id || period?.nameOfPeriod}
            </option>
          );
        })}
      </select>
      <div className="flex">
        <p className="w-1/2">Stemplet Ind</p>
        <p className="w-1/2">Stemplet Ud</p>
      </div>
      <div className="mb-20">
        {currentPeriod?.dates.map((date) => {
          return (
            <div key={date}>
              <SaleryCard
                date={date}
                nameOfPeriod={currentPeriod?.nameOfPeriod}
              />
            </div>
          );
        })}
      </div>
      <FixedTotalHourBar periode={currentPeriod} />
    </div>
  );
}
