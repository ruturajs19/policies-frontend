import React from "react";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <div className="header-container">
      <header>
        <h1>{props.header}</h1>
      </header>
    </div>
  );
}
