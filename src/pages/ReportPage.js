import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from "../components/spinner";
import firebase from "firebase/app";
import "firebase/firestore";
import FourOhFour from "../pages/FourOhFour";
import Menu from "../components/menu";

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
	}
}

class ReportPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = null;

		this.fetchReport = this.fetchReport.bind(this);

		this.mapDivId = `map-${Math.random()}`;
		this.map = new OlMap({
			layers: [
				new OlLayerTile({
					name: 'OSM',
					source: new OlSourceOSM()
				})
			],
		});
	}

	componentDidMount() {
		this.fetchReport();
	}

	fetchReport() {
		let rid = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
		let reportRef = firebase.firestore().collection('reports').doc(rid); // get report from firebase
		reportRef.get().then(doc => {
			if (!doc.exists) {
				ReactDOM.render(<FourOhFour />, document.getElementById("root"));
			}
			else {
				this.setState(doc.data(), () => {
					this.map.setTarget(this.mapDivId);
					this.map.setView(new OlView({ center: fromLonLat([this.state.longitude, this.state.latitude]), zoom: 16 }));
				});
			}
		});
	}

	render() {
		return (
			<div className="App" style={{paddingBottom: "2em"}}>
				<Menu />
				{this.state === null ?
					<Spinner />
					:
					<div style={styles.form}>
						<h2 style={{ textAlign: "left" }}>{this.state.name}'s Field Report</h2>
						<hr />
						<ul style={{textAlign: "left"}}>
							<li>Difficulty: {this.state.difficulty}</li>
							<li>Faction: {this.state.faction}</li>
							<li>Primary: {this.state.primary}</li>
							<li>Secondary: {this.state.secondary}</li>
							<li>Location: {this.state.location}</li>
							<li>Latitude: {this.state.latitude}</li>
							<li>Longitude: {this.state.longitude}</li>
							<li>Documents Found: {this.state.documents}</li>
							<li>Artifacts Found: {this.state.artifacts}</li>
							<li>Total points: {this.state.total}</li>
							<li>Rank: {this.state.rank}</li>
						</ul>
						<div id={this.mapDivId} style={styles.map} />
					</div>
				}
			</div>
		);
	}
}

export default ReportPage;