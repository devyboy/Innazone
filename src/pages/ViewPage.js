import React from 'react';
import Menu from "../components/menu";
import Spinner from "../components/spinner";
import firebase from "firebase/app";
import "firebase/firestore";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import paper from "../images/paper.png";

const styles = {
	card: {
		width: '17rem',
		backgroundImage: `url(${paper})`,
		backgroundRepeat: "repeat",
		textAlign: "left",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: "2em"
	},
	gridContainer: {
		display: "grid",
		gridTemplateColumns: "auto auto auto auto",
		margin: '3em'
	}
}

class ViewPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = null
	}

	componentDidMount() {
		let reports = [];
		let reportRef = firebase.firestore().collection('reports'); // get report from firebase
		reportRef.get().then((snapshot => {
			snapshot.forEach(doc => {
				reports.push([doc.data(), doc.id]);
			});
		})).then(() => {
			this.setState({ reports: reports });
		});
	}

	render() {
		return (
			<div className="App" style={{ height: "100vh" }}>
				<Menu />
				{!this.state ?
					<Spinner />
					:
					<div style={styles.gridContainer}>
						{this.state.reports.length !== 0 ?
							this.state.reports.map((report) => {
								return (
									<Card style={styles.card}>
										<Card.Body>
											<Card.Title>{report[0].name}'s Report</Card.Title>
											<Card.Text>
												<strong>Location: </strong>{report[0].location}
												<br />
												<strong>Difficulty: </strong>{report[0].difficulty}
												<br />
												<strong>Rank: </strong>{report[0].rank}
											</Card.Text>
											<Button variant="dark" onClick={() => window.location.href = `/report/${report[1]}`}>View Report</Button>
										</Card.Body>
									</Card>
								);
							})
							:
							<h1 style={{ color: 'white' }}>No reports to display</h1>
						}
					</div>
				}
			</div>
		);
	}
}

export default ViewPage;