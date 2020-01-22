import React from 'react';
import Menu from "../components/menu";


class SettingsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="App">
				<Menu />
				<h1>Settings Page</h1>
			</div>
		);
	}
}

export default SettingsPage;