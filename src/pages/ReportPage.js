import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Spinner from "../components/spinner";
import firebase from "firebase/app";
import "firebase/firestore";
import FourOhFour from "../pages/FourOhFour";
import Menu from "../components/menu";

import { Modal, Button, Form } from "react-bootstrap";

import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import Reaptcha from "reaptcha";

import paper from "../images/paper.png";

const styles = {
  form: {
    width: "50em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
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
  }
};

class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.captcha = null;
    this.state = {
      data: null,
      deleteModal: false
    };

    this.fetchReport = this.fetchReport.bind(this);
    this.showDelete = this.showDelete.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.mapDivId = `map-${Math.random()}`;
    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: "OSM",
          source: new OlSourceOSM()
        })
      ]
    });
  }

  componentDidMount() {
    this.fetchReport();
  }

  fetchReport() {
    let rid = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    let reportRef = firebase
      .firestore()
      .collection("reports")
      .doc(rid);
    reportRef.get().then(doc => {
      if (!doc.exists) {
        ReactDOM.render(<FourOhFour />, document.getElementById("root"));
      } else {
        this.setState({ data: doc.data() }, () => {
          this.map.setTarget(this.mapDivId);
          this.map.setView(
            new OlView({
              center: fromLonLat([
                this.state.data.longitude,
                this.state.data.latitude
              ]),
              zoom: 16
            })
          );
        });
      }
    });
  }

  showDelete() {
    this.setState({ deleteModal: true });
  }

  deleteReport() {
    const t = require("tripcode");
    if (t(this.state.password) === this.state.data.trip) {
      let rid = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      let reportRef = firebase
        .firestore()
        .collection("reports")
        .doc(rid);
      reportRef.delete().then(() => {
        window.location.href = "/view";
      });
    } else {
      this.setState({ deleteModal: false });
      this.captcha.reset();
    }
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="App" style={{ height: "100%", paddingBottom: "2em" }}>
        <Menu report delete={this.showDelete} />
        {this.state.data === null ? (
          <Spinner />
        ) : (
          <div style={styles.form} className="special">
            <h2 style={{ float: "left" }}>
              <strong>{this.state.data.name}</strong>
              {" #" + this.state.data.trip}
            </h2>
            <h4 style={{ float: "right" }}>
              {new Date(this.state.data.date).toISOString().split("T")[0]}
            </h4>
            <div style={{ clear: "both" }}></div>
            <hr />
            <ul style={{ textAlign: "left" }}>
              <li>Difficulty: {this.state.data.difficulty}</li>
              <li>Faction: {this.state.data.faction}</li>
              <li>Primary: {this.state.data.primary}</li>
              <li>Secondary: {this.state.data.secondary}</li>
              <li>Location: {this.state.data.location}</li>
              <li>Latitude: {this.state.data.latitude}</li>
              <li>Longitude: {this.state.data.longitude}</li>
              <li>Documents Found: {this.state.data.documents}</li>
              <li>Artifacts Found: {this.state.data.artifacts}</li>
              <li>Total points: {this.state.data.total}</li>
              <li>Rank: {this.state.data.rank}</li>
            </ul>
            <div id={this.mapDivId} style={styles.map} />
          </div>
        )}

        <Modal
          show={this.state.deleteModal}
          onHide={() => this.setState({ deleteModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete field report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this report? This action is
            permanent. To proceed, enter the pasword you used to create it below
            and click "Delete".
            <Form style={{ marginTop: "1em" }}>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={this.updatePassword}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ deleteModal: false })}
            >
              Close
            </Button>
            <Fragment>
              <Reaptcha
                ref={e => (this.captcha = e)}
                sitekey="6LfQn9MUAAAAAD2R5eeaT0byQmBQcAmmd-HfdyvK"
                onVerify={this.deleteReport}
                size="invisible"
                theme="dark"
              />
              <Button variant="danger" onClick={() => this.captcha.execute()}>
                Delete
              </Button>
            </Fragment>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ReportPage;
