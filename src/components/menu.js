import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

function Menu(props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/" style={{ color: "#ffc107" }}>Innazone</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/">Home</Nav.Link>
				<Nav.Link href="/create">Create</Nav.Link>
				<Nav.Link href="/view">View</Nav.Link>
				<Nav.Link href="/settings">Settings</Nav.Link>
			</Nav>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-warning">Search</Button>
			</Form>
		</Navbar>
	);
}

export default Menu;