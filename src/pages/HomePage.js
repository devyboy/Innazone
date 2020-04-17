import React from "react";
import Menu from "../components/menu";
import "../css/App.css";

function HomePage(props) {
  return (
    <div className="App" style={{ color: "white" }}>
      <Menu />
      <div>
        <h1>Innazone</h1>
      </div>
    </div>
  );
}

export default HomePage;
