import React from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Menu from "../components/menu";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import paper from "../images/paper.png";


const styles = {
	form: {
		width: "50em",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "2em",
		marginBottom: "2em",
		padding: "2em",
		borderRadius: '5px',
		backgroundImage: `url(${paper})`,
		backgroundRepeat: "repeat"
	},
	map: {
		height: '400px',
		width: '650px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '2em',
		marginBottom: '2em',
		border: '1px solid black'
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
		padding: '.25em',
		borderRadius: 5,
		display: "block",
		cursor: 'pointer',
		marginLeft: "auto",
		marginRight: "auto",
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
			checkTotal: 0,
			rank: "",
			lat: 51.389,
			lon: 30.099,
		};

		this.handleFormChange = this.handleFormChange.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
		this.calculateRank = this.calculateRank.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.uploadImages = this.uploadImages.bind(this);
		this.submitReport = this.submitReport.bind(this);

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

		total += this.state.checkTotal;

		this.setState({ total: total }, () => {
			this.calculateRank();
		});
	}

	calculateRank() {
		let total = this.state.total;
		if (total <= 20) {
			this.setState({ rank: "Rookie" });
		}
		else if (total > 20 && total <= 40) {
			this.setState({ rank: "Experienced" });
		}
		else if (total > 40 && total <= 60) {
			this.setState({ rank: "Veteran" });
		}
		else if (total > 60 && total <= 80) {
			this.setState({ rank: "Expert" });
		}
		else if (total > 80) {
			this.setState({ rank: "Master" });
		}
	}

	handleFormChange(event, field) {
		this.setState({ [field]: event.target.value },
			() => {
				if (field === "lat" || field === "lon") {
					this.map.setView(new OlView({ center: fromLonLat([this.state.lon, this.state.lat]), zoom: 15 }));
				}
				if (field === "faction") {
					this.setState({ checkTotal: 0 }, () =>
						this.calculateTotal()
					);
				}
				this.calculateTotal();
			}
		);
	}

	handleCheck(event) {
		let total = this.state.checkTotal;
		if (event.target.checked) {
			total += event.target.value * 1;
		}
		else {
			total -= event.target.value * 1;
		}

		this.setState({ checkTotal: total }, () => {
			this.calculateTotal();
		});
	}

	handleImageUpload(event) {
		if (event.target.files.length > 5) {
			alert("Please only select 5 images");
		}
		else {
			this.setState({ images: event.target.files });
		}
	}

	uploadImages() {
		let key = "7c3859cee5b7cd6ccadc85b2b09ee89d";
		let url = `https://api.imgbb.com/1/upload?key=${key}`;
		let reader = new FileReader();
		let images = Array.from(this.state.images);

		reader.onloadend = function () {
			fetch(url, {
				method: "POST",
				body: {
					key: key,
					image: reader.result
				}
			}).then((response) => response.json()).then((jayson) => console.log(jayson));
		}

		images.forEach(file => {
			reader.readAsDataURL(file);
		});
	}

	submitReport() {
		let reportsRef = firebase.firestore().collection("reports");

		reportsRef.add({
			name: this.state.name,
			faction: this.state.faction,
			difficulty: this.state.difficulty,
			primary: this.state.primary,
			secondary: this.state.secondary,
			location: this.state.location,
			latitude: this.state.lat,
			longitude: this.state.lon,
			documents: this.state.documents,
			artifacts: this.state.artifacts,
			total: this.state.total,
			rank: this.state.rank
		}).then((res) => {
			let key = res._key.path.segments[1];
			this.setState({ successModal: true, shareURL: window.location.origin + `/report/${key}` });
		}).catch((e) => {
			console.log(e.message);
		});
	}

	render() {
		return (
			<div className="App">

				<Menu />
				<Form style={styles.form}>

					<h2 style={{ textAlign: "left" }}>New Field Report</h2>
					<hr />

					<Form.Row>

						<Form.Group as={Col} controlId="formGridName" onChange={(e) => this.handleFormChange(e, "name")}>
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

						<Form.Group as={Col} controlId="formGridPrimary" onChange={(e) => this.handleFormChange(e, "primary")}>
							<Form.Label>Primary Weapon</Form.Label>
							<Form.Control placeholder="Izhmash AK-74" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridSecondary" onChange={(e) => this.handleFormChange(e, "secondary")}>
							<Form.Label>Secondary Weapon</Form.Label>
							<Form.Control placeholder="Beretta 92FS" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridLocation" onChange={(e) => this.handleFormChange(e, "location")}>
							<Form.Label>Location Name</Form.Label>
							<Form.Control placeholder="Chernobyl Power Plant" />
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

					<Form.Group id="formGridCheckbox" style={{ textAlign: "left" }} onChange={(e) => this.handleCheck(e)}>
						<h4>Completion</h4>
						<Form.Check type="checkbox" label="Didn't complete faction task (-15)" value={-15} />
						<Form.Check type="checkbox" label="Failure condition happened (-25)" value={-25} />
						<Form.Check type="checkbox" label="Wore your factions patch (+5)" value={5} />
						<hr />
						<h4>Scavenging</h4>
						<Form.Check type="checkbox" label="Brought back usable tool (+1)" value={1} />
						<Form.Check type="checkbox" label="Found and used a piece of gear in the field (+3)" value={3} />
						<hr />
						<h4>Environmental</h4>
						<Form.Check type="checkbox" label="Brought and played harmonica or acoustic guitar (+5)" value={5} />
						<Form.Check type="checkbox" label="Brought and read hard copy of Roadside Picnic (+5)" value={5} />
						<Form.Check type="checkbox" label="It rained or snowed (+5)" value={5} />
						<Form.Check type="checkbox" label="It rained or snowed the entire time (+5)" value={5} />
						<Form.Check type="checkbox" label="Spent each night in a different structure (+10)" value={10} />
						<Form.Check type="checkbox" label="Lit a campfire in an old container and squatted around it (+10)" value={10} />
						<hr />
						<h4>Social</h4>
						<Form.Check type="checkbox" label="Your entire party was the same faction (+5)" value={5} />
						<Form.Check type="checkbox" label="Left a stash behind (+5)" value={5} />
						<Form.Check type="checkbox" label="Found another Stalker's stash (+10)" value={10} />
						<hr />
						<h4>Extreme Mode</h4>
						<Form.Check type="checkbox" label="Was in a real-life exclusion zone (+20)" value={20} />
						<Form.Check type="checkbox" label="Zone was actually irradiated above normal ambient levels (+20)" value={20} />
						<Form.Check type="checkbox" label="Actually did this in Chernobyl (+40)" value={40} />
						<hr />
						<h4>Faction Specific</h4>
						{this.state.faction === "Loner" &&
							<Form.Check type="checkbox" label="Brought pistol carbine or 9x18 pistol (+5)" value={5} />
						}
						{this.state.faction === "Bandit" &&
							<div>
								<Form.Check type="checkbox" label="Wore nothing but Adidas clothing (+5)" value={5} />
								<Form.Check
									type="checkbox"
									label="Snuck up behind a non-stalker, shouted 'CHEEKI BREEKI IV DAMKE' and ran away (+15)" value={15}
								/>
							</div>
						}
						{this.state.faction === "Military" &&
							<div>
								<Form.Check type="checkbox" label="Slavshit rifle and pistol combo (+5)" value={5} />
								<Form.Check type="checkbox" label="Only ate MREs (+5)" value={5} />
								<Form.Check type="checkbox" label="Armor was actually slavshit (+10)" value={10} />
							</div>
						}
						{this.state.faction === "Monolith" &&
							<div>
								<Form.Check type="checkbox" label="Audibly chanted or made noise while praying (+5)" value={5} />
								<Form.Check type="checkbox" label="Wore a gas mask at all times while outside (+10)" value={10} />
							</div>
						}
						{this.state.faction === "Scientist" &&
							<div>
								<Form.Check type="checkbox" label="Wore gas mask or respirator at all times while inside a structure (+10)" value={10} />
								<Form.Check type="checkbox" label="Did your logging with a Geiger counter (+5)" value={5} />
							</div>
						}
						{this.state.faction === "Mercenary" &&
							<div>
								<Form.Check type="checkbox" label="Brought two friends and designated one as the commander (+10)" value={10} />
								<Form.Check type="checkbox" label="Reported to and carried our arbitrary orders from an offsite friend over radio (+10)" value={10} />
							</div>
						}
						{this.state.faction === "Duty" &&
							<div>
								<Form.Check type="checkbox" label="Killed a mutant (any wild animal) (+5)" value={5} />
								<Form.Check type="checkbox" label="Posted or will post a complete field report of everything you did and observed on /k/ (+10)" value={10} />
							</div>
						}
						{this.state.faction === "Freedom" &&
							<div>
								<Form.Check type="checkbox" label="Wore all Flecktarn camo (+5)" value={5} />
								<Form.Check type="checkbox" label="Smoked something (cigs, pot, random plant, etc) (+10)" value={10} />
							</div>
						}
						<hr />
					</Form.Group>

					<Form.Group style={{ textAlign: "left" }}>
						<h3>Total Points: {this.state.total} </h3>
						<h3>Rank: {this.state.rank} </h3>
					</Form.Group>
					<hr />

					<input
						type="file"
						id="file"
						accept=".png, .jpg, .jpeg"
						multiple
						onChange={(e) => this.handleImageUpload(e)}
						style={styles.input}
					/>

					<label htmlFor="file">
						<Button variant="dark" as="div">Upload Images</Button>
					</label>

				</Form>

				<Button variant="warning" onClick={this.submitReport} style={{ marginBottom: "5em" }}>
					Submit Report
				</Button>

				<Modal show={this.state.successModal} onHide={() => this.setState({ successModal: false })}>
					<Modal.Header closeButton>
						<Modal.Title>Field Report Created</Modal.Title>
					</Modal.Header>
					<Modal.Body>Share link: <a href={this.state.shareURL} target="_blank">{this.state.shareURL}</a></Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.setState({ successModal: false })}>
							Close
          </Button>
					</Modal.Footer>
				</Modal>

			</div>
		);
	}
}

export default CreatePage;