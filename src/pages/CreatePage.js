import React from "react";

import "firebase/firestore";
import "firebase/storage";

import ReportForm from "../components/reportform";
import StashForm from "../components/stashform";

import Menu from "../components/menu";
import Nav from "react-bootstrap/Nav";

import paper from "../images/paper.png";

const styles = {
  form: {
    width: "50em",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "4em",
    padding: "3em",
    borderRadius: "5px",
    backgroundImage: `url(${paper})`,
    backgroundRepeat: "repeat"
  },
  map: {
    height: "400px",
    width: "650px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
    marginBottom: "2em",
    border: "1px solid black"
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1
  },
  label: {
    fontSize: "1em",
    color: "white",
    backgroundColor: "red",
    width: "150px",
    padding: ".25em",
    borderRadius: 5,
    display: "block",
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto"
  },
  captcha: {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "2em"
  }
};

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "field"
    };
  }

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <Menu />

        <Nav
          variant="pills"
          defaultActiveKey="field"
          onSelect={val => this.setState({ active: val })}
          className="justify-content-center"
          style={{ marginBottom: "2em", marginTop: "2em" }}
        >
          <Nav.Item>
            <Nav.Link eventKey="field">Create Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="stash">Create Stash</Nav.Link>
          </Nav.Item>
        </Nav>

        {this.state.active === "field" ? (
          <ReportForm styles={styles} />
        ) : (
          <StashForm styles={styles} />
        )}
      </div>
    );
  }
}

export default CreatePage;
