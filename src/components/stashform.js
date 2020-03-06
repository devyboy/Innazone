import React from 'react';

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import firebase from 'firebase';

var Recaptcha = require('react-recaptcha');

class StashForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      latDir: "N",
      lonDir: "W"
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.closeSuccess = this.closeSuccess.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.submitStash = this.submitStash.bind(this);

    this.mapDivId = `map-${Math.random()}`;
    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOSM()
        })
      ],
      view: new OlView({
        center: fromLonLat([30.099, 51.389]),
        zoom: 16
      })
    });
  }

  componentDidMount() {
    this.map.setTarget(this.mapDivId);
  }

  handleFormChange(event, field) {
    this.setState({ [field]: event.target.value },
      () => {
        if (field === "lat" || field === "lon" || field === "latDir" || field === "lonDir") {
          this.map.setView(
            new OlView({
              center: fromLonLat([
                this.state.lonDir === 'W' ? this.state.lon * -1 : this.state.lon,
                this.state.latDir === 'S' ? this.state.lat * -1 : this.state.lat
              ]),
              zoom: 16
            }));
        }
      }
    );
  }

  addItem(event) {
    if (event.keyCode === 13 || event.type === "blur") {
      if (!this.state.items.includes(event.target.value) && event.target.value !== "") {
        this.setState(state => ({
          items: state.items.concat(this.state.item),
          item: ""
        }));
      }
    }
  }

  deleteItem(delItem) {
    this.setState(state => ({
      items: state.items.filter((item) => // filter out the SLO's that aren't the one you want to delete
        item !== delItem
      )
    }));
  }

  closeSuccess() {
    this.setState({
      successModal: false,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  verifyInputs() {
    let flag = true;
    if (!this.state.lat) {
      flag = false;
      this.setState({ latError: true });
    }
    else {
      this.setState({ latError: false });
    }
    if (!this.state.lon) {
      flag = false;
      this.setState({ lonError: true });
    }
    else {
      this.setState({ lonError: false });
    }
    if (!this.state.description) {
      flag = false;
      this.setState({ descriptionError: true });
    }
    else {
      this.setState({ descriptionError: false });
    }
    if (this.state.items.length < 1) {
      flag = false;
      this.setState({ itemsError: true });
    }
    else {
      this.setState({ itemsError: false });
    }
    return flag;
  }

  submitStash() {
    if (!this.verifyInputs()) {
      this.setState({
        successModal: true,
        modalTitle: "You have unfinished business",
        modalBody: "Please fill the inputs highlighted in red and try again."
      });
    }
    else {
      let reportsRef = firebase.firestore().collection("stashes");
      reportsRef.add({
        latitude: this.state.latDir === "S" ? this.state.lat * -1 : this.state.lat,
        longitude: this.state.lonDir === "W" ? this.state.lon * -1 : this.state.lon,
        description: this.state.description,
        items: this.state.items
      }).then((res) => {
        let id = res._key.path.segments[1];
        let shareURL = window.location.origin + `/stash/${id}`;
        this.setState({
          successModal: true,
          modalTitle: "Stash Created",
          modalBody: <div>Share link: <a href={shareURL} target="_blank" rel="noopener noreferrer">{shareURL}</a></div>,
        });
      }).catch((e) => {
        console.log(e.message);
      });
    }
  }

  verifyCallback() {
    this.setState({ captcha: true });
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <div>
        <Form style={this.props.styles.form}>
          <h2 style={{ textAlign: "left" }}>New Stash</h2>
          <hr />
          <Form.Row>
            <Form.Group
              as={Col}
              controlId="formGridLat"
              onChange={(e) => this.handleFormChange(e, "lat")}
              value={this.state.lat}
            >
              <Form.Label>Latitude</Form.Label>
              <Form.Control placeholder="51.389" style={this.state.latError ? { border: "2px solid red" } : null} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLatDir">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleFormChange(e, "latDir")}
                value={this.state.latDir}
              >
                <option>N</option>
                <option>S</option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLon"
              onChange={(e) => this.handleFormChange(e, "lon")}
              value={this.state.lon}
            >
              <Form.Label>Longitude</Form.Label>
              <Form.Control placeholder="30.099" style={this.state.lonError ? { border: "2px solid red" } : null} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLonDir">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleFormChange(e, "lonDir")}
                value={this.state.lonDir}
              >
                <option>W</option>
                <option>E</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <div style={{ width: '30em', margin: '0 auto' }}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Location Description</Form.Label>
                <Form.Control
                  placeholder="Describe the location of this stash..."
                  as="textarea"
                  rows="4"
                  onChange={(e) => this.handleFormChange(e, "description")}
                  value={this.state.description}
                  style={this.state.descriptionError ? { border: "2px solid red" } : null}
                />
              </Form.Group>
            </Form.Row>
          </div>

          <div style={{ width: "20em", margin: '0 auto' }}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridItems">
                <Form.Label>Items Stashed</Form.Label>
                <Form.Control
                  placeholder="2x box of cigarettes"
                  value={this.state.item}
                  onBlur={this.addItem}
                  onKeyDown={this.addItem}
                  onChange={(e) => this.handleFormChange(e, "item")}
                  style={this.state.itemsError ? { border: "2px solid red" } : null}
                />
              </Form.Group>
            </Form.Row>
          </div>

          <div style={{ width: '20em', margin: '0 auto' }}>
            <ul>
              {this.state.items.map((item) => {
                return (
                  <li className="item-list" onClick={() => this.deleteItem(item)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            id={this.mapDivId}
            style={this.props.styles.map}
          />

          <hr />

          <input
            type="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            multiple
            onChange={(e) => this.handleImageUpload(e)}
            style={this.props.styles.input}
          />

          <label htmlFor="file">
            <Button variant="dark" as="div">Upload Images</Button>
          </label>

        </Form>

        <div style={this.props.styles.captcha}>
          <Recaptcha
            sitekey="6LfQn9MUAAAAAD2R5eeaT0byQmBQcAmmd-HfdyvK"
            render="explicit"
            verifyCallback={this.verifyCallback}
          />
        </div>

        <Button
          variant="warning"
          disabled={!this.state.captcha}
          onClick={this.submitStash}
          style={{ marginBottom: "5em" }}
        >
          Submit Report
				</Button>

        <Modal show={this.state.successModal} onHide={this.closeSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeSuccess}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default StashForm;