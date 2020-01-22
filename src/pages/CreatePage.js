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
					<Form.Row>
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="formGridAddress1">
						<Form.Label>Address</Form.Label>
						<Form.Control placeholder="1234 Main St" />
					</Form.Group>

					<Form.Group controlId="formGridAddress2">
						<Form.Label>Address 2</Form.Label>
						<Form.Control placeholder="Apartment, studio, or floor" />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>City</Form.Label>
							<Form.Control />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>State</Form.Label>
							<Form.Control as="select">
								<option>Choose...</option>
								<option>...</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label>Zip</Form.Label>
							<Form.Control />
						</Form.Group>
					</Form.Row>

					<Form.Group id="formGridCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
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