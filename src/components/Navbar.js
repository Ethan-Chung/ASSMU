import { Link} from 'react-router-dom';
import assmulogo from '../images/assmulogo.jpg';
import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Navbars = () => {
    return (
        
        <div>            
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to={"/"} className="navbar">
                <img src={assmulogo} id="logo" alt="logo" className="navbar-image"/>
                ASSMU
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav navbar">
            <Nav className="ms-auto navbar">
                <Nav.Link as={Link} to={"/clubs"}>Clubs</Nav.Link>
                <Nav.Link as={Link} to={"/events"}>Events</Nav.Link>
                <Nav.Link as={Link} to={"/assmu"}>ASSMU</Nav.Link>
                <Nav.Link as={Link} to={"/calendar"}>Calendar</Nav.Link>
                <Nav.Link as={Link} to={"/resources"}>Resources</Nav.Link>
                <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>          
            </Nav>
            {/*<Form className="d-flex">
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                <Button variant="outline-success">Search</Button>
            </Form>*/}
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
    );
}
 
export default Navbars;