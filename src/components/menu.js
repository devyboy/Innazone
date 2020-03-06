import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Menu() {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/" style={{ color: "#ffc107" }}>Innazone</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/">Home</Nav.Link>
				<Nav.Link href="/create">Create</Nav.Link>
				<Nav.Link href="/view">View</Nav.Link>
				<Nav.Link href="/settings">Settings</Nav.Link>
				<Nav.Link href="/challenge">The Challenge</Nav.Link>
			</Nav>
		</Navbar>
	);
}

export default Menu;