import React from 'react';
import Menu from "../components/menu";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';




const styles = {
	form: {
		width: "60%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "2em"
	},
	map: {
		height: '400px',
		width: '650px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '2em',
		marginBottom: '2em',
	}
}

class CreatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}

		this.mapDivId = `map-${Math.random()}`;

		this.map = new OlMap({
			layers: [
				new OlLayerTile({
					name: 'OSM',
					source: new OlSourceOSM()
				})
			],
			view: new OlView({
				center: fromLonLat([-75, 39]),
				zoom: 15
			})
		});
	}

	componentDidMount() {
		this.map.setTarget(this.mapDivId);
	}

	render() {
		return (
			<div className="App">
				<Menu />
				<Form style={styles.form}>

					<h2>General</h2>

					<Form.Row>

						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Name</Form.Label>
							<Form.Control placeholder="Artyom" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridFaction">
							<Form.Label>Faction</Form.Label>
							<Form.Control as="select">
								<option>Loner</option>
								<option>Bandit</option>
								<option>Military</option>
								<option>Monolith</option>
								<option>Scientist</option>
								<option>Mercenary</option>
								<option>Duty</option>
								<option>Freedom</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridDifficulty">
							<Form.Label>Difficulty</Form.Label>
							<Form.Control as="select">
								<option>Novice</option>
								<option>Stalker</option>
								<option>Veteran</option>
								<option>Master</option>
							</Form.Control>
						</Form.Group>

					</Form.Row>

					<Form.Row>

						<Form.Group as={Col} controlId="formGridPrimary">
							<Form.Label>Primary Weapon</Form.Label>
							<Form.Control placeholder="Izhmash AK-74" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridSecondary">
							<Form.Label>Secondary Weapon</Form.Label>
							<Form.Control placeholder="Beretta 92FS" />
						</Form.Group>
					</Form.Row>

					<Form.Row>

						<Form.Group as={Col} controlId="formGridLat">
							<Form.Label>Latitude</Form.Label>
							<Form.Control placeholder="51.389" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridLon">
							<Form.Label>Longitude</Form.Label>
							<Form.Control placeholder="30.099" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridDocuments">
							<Form.Label># of Documents</Form.Label>
							<Form.Control placeholder="2" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridArtifacts">
							<Form.Label># of Artifacts</Form.Label>
							<Form.Control placeholder="4" />
						</Form.Group>

					</Form.Row>
					<hr />

					<Form.Group id="formGridCheckbox" style={{textAlign: "left"}}>
						<h4>Faction</h4>
						<Form.Check type="checkbox" label="Completed faction task (-15)" />
						<Form.Check type="checkbox" label="Failure condition happened (-25)" />
						<Form.Check type="checkbox" label="Wore your factions patch (+5)" />
						<hr />
						<h4>Scavenging</h4>
						<Form.Check type="checkbox" label="Brought back usable tool (+1)" />
						<Form.Check type="checkbox" label="Found and used a piece of gear in the field (+3)" />
						<hr />
						<h4>Environmental</h4>
						<Form.Check type="checkbox" label="Brought and played harmonica or acoustic guitar (+5)" />
						<Form.Check type="checkbox" label="Brought and read hard copy of Roadside Picnic (+5)" />
						<Form.Check type="checkbox" label="It rained or snowed (+5)" />
						<Form.Check type="checkbox" label="It rained or snowed the entire time (+5)" />
						<Form.Check type="checkbox" label="Spent each night in a different structure (+10)" />
						<Form.Check type="checkbox" label="Lit a campfire in an old container and squatted around it (+10)" />
						<hr />
						<h4>Social</h4>
						<Form.Check type="checkbox" label="Your entire party was the same faction (+5)" />
						<Form.Check type="checkbox" label="Left a stash behind (+5)" />
						<Form.Check type="checkbox" label="Found another Stalker's stash (+10)" />
						<hr />
						<h4>Extreme Mode</h4>
						<Form.Check type="checkbox" label="Was in a real-life exclusion zone (+20)" />
						<Form.Check type="checkbox" label="Zone was actually irradiated above normal ambient levels (+20)" />
						<Form.Check type="checkbox" label="Actually did this in Chernobyl (+40)" />
						<hr />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
  				</Button>

				</Form>

				<div
					id={this.mapDivId}
					style={styles.map}
				/>
			</div>
		);
	}
}

export default CreatePage;