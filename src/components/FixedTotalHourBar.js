import React, { useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";
import WorkHoursCalculator from "./GetTotalHours";
import { LangContext } from "../context/LangContext";

export default function FixedTotalHourBar({ periode }) {
  const [total, setTotal] = useState([]);

  const { language } = useContext(LangContext);

  useEffect(() => {
    database
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .collection("lonperioder")
      .doc(periode?.nameOfPeriod)
      .collection("stempel")
      .get()
      .then((doc) => {
        var totalHours = [];
        doc.docs.forEach((item) => {
          if (item?.data()?.stempelIn?.time && item?.data()?.stempelOut?.time) {
            const totalHour = WorkHoursCalculator(
              item?.data()?.stempelIn?.time,
              item?.data()?.stempelOut?.time
            );

            totalHours.push(totalHour);
          }
        });
        setTotal(totalHours);
      });
  }, [periode]);

  function makeInt() {
    var totalHours = 0;

    total?.forEach((item) => {
      totalHours += parseFloat(item);
    });

    database
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .collection("lonperioder")
      .doc(periode?.nameOfPeriod)
      .update({
        totalHours: totalHours,
        lastUpdated: new Date(),
      });

    return totalHours;
  }
  return language ? (
    <div className="fixed bottom-0 left-0 w-full bg-gray-500 p-4">
      {/* Your content here */}
      <p>Total hours: {makeInt()}</p>
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 w-full bg-gray-500 p-4">
      {/* Your content here */}
      <p>Timer i alt: {makeInt()}</p>
    </div>
  );
}
