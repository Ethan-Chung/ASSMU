import { Link} from 'react-router-dom';
import assmulogo from '../images/assmulogo.jpg';
import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const Navbars = () => {
    return (
        
        <div>            
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to={"/"} className="navbar">
                <img src={assmulogo} id="logo" className="navbar-image"/>
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
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
       
        
        
        
        /*<nav className="navbar">
            <div className="links">
                <Link to="/clubs">Clubs</Link>
                <Link to="/events">Events</Link>
                <Link to="/assmu">ASSMU</Link>
                <Link to="/"> <img src={assmulogo} id = "logo" alt = "ASSMU logo"/> </Link>
                <Link to="/calendar">Calendar</Link>
                <Link to="/resources">Resources </Link>
                <Link to="/contact">Contact</Link>

            </div>
        </nav>*/
    );
}
 
export default Navbars;