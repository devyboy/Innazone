import React from "react";
import trefoil from "../images/trefoil.svg";

function Spinner(props) {
  return (
    <div className="loading">
      <div className="loading-in">
        <img src={trefoil} alt="loading-spinner" />
      </div>
    </div>
  );
}

export default Spinner;
