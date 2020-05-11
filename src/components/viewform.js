import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import checkDict from '../checkDict';

class ViewForm extends React.Component {
  constructor(props) {
    super(props);

    this.mapDivId = `map-${Math.random()}`;
    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOSM()
        })
      ],
      view: new OlView({
        center: fromLonLat([0, 0]),
        zoom: 16
      })
    });
  }

  componentDidMount() {
    this.map.setTarget(this.mapDivId);
  }

  render() {
    this.map.setView(
      new OlView({
        center: fromLonLat([
          this.props.data.longitude,
          this.props.data.latitude
        ]),
        zoom: 16
      })
    );
    return (
      <div className='form'>
        <Form
          style={this.props.styles.form}
          className='special'
          id='reportForm'
        >
          <h2 style={{ textAlign: 'left' }}>{this.props.data.name}'s Report</h2>
          <hr />

          <Form.Row>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control value={this.props.data.name} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPass'>
              <Form.Label>Tripcode</Form.Label>
              <Form.Control value={this.props.data.trip} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridFaction'>
              <Form.Label>Faction</Form.Label>
              <Form.Control
                as='select'
                value={this.props.data.faction}
                readOnly
              >
                <option>Loner</option>
                <option>Bandit</option>
                <option>Military</option>
                <option>Monolith</option>
                <option>Scientist</option>
                <option>Mercenary</option>
                <option>Duty</option>
                <option>Freedom</option>
                <option>Clear Sky</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDifficulty'>
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as='select'
                readOnly
                value={this.props.data.difficulty}
              >
                <option>Novice</option>
                <option>Stalker</option>
                <option>Veteran</option>
                <option>Master</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridPrimary'>
              <Form.Label>Primary Weapon</Form.Label>
              <Form.Control value={this.props.data.primary} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSecondary'>
              <Form.Label>Secondary</Form.Label>
              <Form.Control value={this.props.data.secondary} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLocation'>
              <Form.Label>Location Name</Form.Label>
              <Form.Control value={this.props.data.location} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={
                  new Date(this.props.data.date).toISOString().split('T')[0]
                }
                readOnly
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridLat'>
              <Form.Label>Latitude</Form.Label>
              <Form.Control value={this.props.data.latitude} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLatDir'>
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as='select'
                value={this.props.data.lat < 0 ? 'SOUTH' : 'NORTH'}
                readOnly
              >
                <option>NORTH</option>
                <option>SOUTH</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLon'>
              <Form.Label>Longitude</Form.Label>
              <Form.Control value={this.props.data.longitude} readOnly />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLonDir'>
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as='select'
                value={this.props.data.lat < 0 ? 'WEST' : 'EAST'}
                readOnly
              >
                <option>EAST</option>
                <option>WEST</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDocuments'>
              <Form.Label>Documents</Form.Label>
              <Form.Control
                as='select'
                value={this.props.data.documents}
                readOnly
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridArtifacts'>
              <Form.Label>Artifacts</Form.Label>
              <Form.Control
                as='select'
                value={this.props.data.artifacts}
                readOnly
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={10}
              value={this.props.data.description}
              readOnly
            />
          </Form.Row>

          <div id={this.mapDivId} style={this.props.styles.map} />

          <hr />

          <Form.Group id='formGridCheckbox' style={{ textAlign: 'left' }}>
            <h4>Completed Tasks</h4>
            {this.props.data.checks.map((check) => (
              <Form.Check type='checkbox' label={checkDict[check]} checked />
            ))}
          </Form.Group>

          <hr />

          <Form.Group style={{ textAlign: 'left' }}>
            <h3>Total Points: {this.props.data.total} </h3>
            <h3>Rank: {this.props.data.rank} </h3>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default ViewForm;
