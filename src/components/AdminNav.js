import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
        <li style={{ listStyle: "none" }}>
          <Link style={{ color: "white" }} to="/menu">
            Tilbage
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link style={{ color: "white" }} to="/admin">
            Admin
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link style={{ color: "white" }} to="/allLonkort">
            Alle lønkort
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link style={{ color: "white" }} to="/create">
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
}
