import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Menu(props) {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand
        href='/'
        style={{ color: '#ffc107', fontSize: '1.5em' }}
        className='special'
      >
        Innazone
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/create'>Create</Nav.Link>
        <Nav.Link href='/view'>View</Nav.Link>
        <Nav.Link href='/settings'>Settings</Nav.Link>
        <Nav.Link href='/challenge'>The Challenge</Nav.Link>
      </Nav>

      {props.report && (
        <Nav>
          <Nav.Link>
            <Button variant='info' onClick={props.edit}>
              Edit
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button variant='danger' onClick={props.delete}>
              Delete
            </Button>
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}

export default Menu;
