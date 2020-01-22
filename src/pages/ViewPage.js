import React from 'react';
import Menu from "../components/menu";


class ViewPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="App">
				<Menu />
				<h1>View Page</h1>
			</div>
		);
	}
}

export default ViewPage;