import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Menu(props) {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand
        href='/'
        style={{ color: '#ffc71f', fontSize: '2em', paddingLeft: 10 }}
        className='special'
      >
        Innazone
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>HOME</Nav.Link>
        <Nav.Link href='/create'>CREATE</Nav.Link>
        <Nav.Link href='/view'>VIEW</Nav.Link>
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
