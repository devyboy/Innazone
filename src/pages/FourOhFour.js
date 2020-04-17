import React from "react";

const styles = {
  fourohfour: {
    lineHeight: 1.2,
    color: "#888",
    display: "table",
    fontFamily: "sans-serif",
    height: "100%",
    textAlign: "center",
    width: "100%",
    position: "absolute"
  },
  cont: {
    display: "table-cell",
    verticalAlign: "middle"
  },
  h1: {
    color: "#555",
    fontSize: "2em",
    fontWeight: 400
  },
  p: {
    margin: "0 auto",
    width: "300px"
  }
};

function FourOhFour(props) {
  return (
    <div style={styles.fourohfour}>
      <div style={styles.cont}>
        <h1 style={styles.h1}>Lost to the Zone.</h1>
        <p style={styles.p}>
          Sorry, but the page you were trying to view does not exist. Check the
          map on your PDA or <a href="/">head back to base</a>.
        </p>
      </div>
    </div>
  );
}

export default FourOhFour;
