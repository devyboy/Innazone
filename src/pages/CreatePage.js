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
			faction: "Loner",
			difficulty: "Novice",
			artifacts: 0,
			documents: 0,
			total: 0,
			rank: "",
			lat: 51.389,
			lon: 30.099,
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
		this.calculateRank = this.calculateRank.bind(this);

		this.mapDivId = `map-${Math.random()}`;

		this.map = new OlMap({
			layers: [
				new OlLayerTile({
					name: 'OSM',
					source: new OlSourceOSM()
				})
			],
			view: new OlView({
				center: fromLonLat([this.state.lon, this.state.lat]),
				zoom: 15
			})
		});
	}

	componentDidMount() {
		this.map.setTarget(this.mapDivId);
		this.calculateTotal();
		this.calculateRank();
	}

	calculateTotal() {
		let total = 0;

		switch (this.state.faction) {
			case "Loner":
				total += 5;
				break;
			case "Bandit":
				total += 10;
				break;
			case "Military":
				total += 15;
				break;
			case "Monolith":
				total += 20;
				break;
			case "Scientist":
				total += 20;
				break;
			case "Mercenary":
				total += 15;
				break;
			case "Duty":
				total += 20;
				break;
			case "Freedom":
				total += 15;
				break;
		}

		switch (this.state.difficulty) {
			case "Novice":
				total += 0;
				break;
			case "Stalker":
				total += 5;
				break;
			case "Veteran":
				total += 10;
				break;
			case "Master":
				total += 20;
				break;
		}

		total += (this.state.artifacts * 1) + (this.state.documents * 2);

		return (total);
	}

	calculateRank(total) {
		if (total <= 20) {
			return ("Rookie");
		}
		else if (total > 20 && total <= 40) {
			return ("Experienced");
		}
		else if (total > 40 && total <= 60) {
			return ("Veteran");
		}
		else if (total > 60 && total <= 80) {
			return ("Expert");
		}
		else if (total > 80) {
			return ("Master");
		}
	}

	handleFormChange(event, field) {
		this.setState({ [field]: event.target.value },
			() => {
				this.map.setView(new OlView({ center: fromLonLat([this.state.lon, this.state.lat]), zoom: 15 }));
				this.calculateTotal();
				this.calculateRank();
			}
		);
	}

	render() {
		let total = this.calculateTotal();
		let rank = this.calculateRank(total);

		return (
			<div className="App">

				<Menu />
				<Form style={styles.form}>

					<h2 style={{ textAlign: "left" }}>Create a Stalker Report</h2>
					<hr />

					<Form.Row>

						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Name</Form.Label>
							<Form.Control placeholder="Artyom" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridFaction">
							<Form.Label>Faction</Form.Label>
							<Form.Control
								as="select"
								onChange={(e) => this.handleFormChange(e, "faction")}
								value={this.state.faction}
							>
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

						<Form.Group
							as={Col}
							controlId="formGridDifficulty"
							onChange={(e) => this.handleFormChange(e, "difficulty")}
							value={this.state.difficulty}
						>
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

						<Form.Group
							as={Col}
							controlId="formGridLat"
							onChange={(e) => this.handleFormChange(e, "lat")}
							value={this.state.lat}
						>
							<Form.Label>Latitude</Form.Label>
							<Form.Control placeholder="51.389" />
						</Form.Group>

						<Form.Group
							as={Col}
							controlId="formGridLon"
							onChange={(e) => this.handleFormChange(e, "lon")}
							value={this.state.lon}
						>
							<Form.Label>Longitude</Form.Label>
							<Form.Control placeholder="30.099" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridDocuments">
							<Form.Label># of Documents</Form.Label>
							<Form.Control
								as="select"
								onChange={(e) => this.handleFormChange(e, "documents")}
								value={this.state.documents}
							>
								<option>0</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridArtifacts">
							<Form.Label># of Artifacts</Form.Label>
							<Form.Control
								as="select"
								onChange={(e) => this.handleFormChange(e, "artifacts")}
								value={this.state.artifacts}
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

					<div
						id={this.mapDivId}
						style={styles.map}
					/>

					<hr />

					<Form.Group id="formGridCheckbox" style={{ textAlign: "left" }}>
						<h4>Completion</h4>
						<Form.Check type="checkbox" label="Didn't complete faction task (-15)" />
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
						<h4>Faction Specific</h4>
						<Form.Check type="checkbox" label="Completed faction task (-15)" />
						<Form.Check type="checkbox" label="Failure condition happened (-25)" />
						<Form.Check type="checkbox" label="Wore your factions patch (+5)" />
						<hr />
					</Form.Group>

					<Form.Group style={{ textAlign: "left" }}>
						<h3>Total Points: {total} </h3>
						<h3>Rank: {rank} </h3>
					</Form.Group>
					<hr />

					<Button variant="primary" onClick={() => console.log(this.state)}>
						Submit
  				</Button>

				</Form>
			</div>
		);
	}
}

export default CreatePage;