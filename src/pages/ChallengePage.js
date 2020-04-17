import React from "react";
import Menu from "../components/menu";
import "../css/App.css";

import challenge from "../images/mainchallenge.png";

function ChallengePage(props) {
  return (
    <div className="App" style={{ color: "white" }}>
      <Menu />
      <div style={{ marginTop: "2em" }}>
        <h1>The Challenge</h1>
        <img src={challenge} alt="challenge" />
      </div>
    </div>
  );
}

export default ChallengePage;
