import React, { useState } from "react";
import { useEffect } from "react";
import { auth, database } from "../firebase";

export default function SaleryCard({ date, nameOfPeriod }) {
  const [workday, setWorkday] = useState({});

  const datecode = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  useEffect(() => {
    database
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("lonperioder")
      .doc(nameOfPeriod)
      .collection("stempel")
      .doc(datecode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setWorkday(doc.data());
        }
      });
  }, [setWorkday, datecode, nameOfPeriod]);

  return (
    <div className="bg-gray-700 p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </h3>
      <div className="flex">
        <div className="w-1/2">
          <p>{workday?.stempelIn?.time || ""}</p>
        </div>
        <div className="w-1/2">
          <p>{workday?.stempelOut?.time || ""}</p>
        </div>
      </div>
    </div>
  );
}
