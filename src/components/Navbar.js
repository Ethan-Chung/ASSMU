import { Link } from 'react-router-dom';
import assmulogo from '../images/assmulogo.jpg';
import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/clubs">Clubs</Link>
                <Link to="/events">Events</Link>
                <Link to="/assmu">ASSMU</Link>
                <Link to="/"> <img src={assmulogo} id = "logo" alt = "ASSMU logo"/> </Link>
                <Link to="/calendar">Calendar</Link>
                <Link to="/resources">Resources </Link>
                <Link to="/contact">Contact</Link>

            </div>
        </nav>
    );
}
 
export default Navbar;