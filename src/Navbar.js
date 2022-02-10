import { Link } from 'react-router-dom';
import assmulogo from './assmulogo.jpg';
import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/clubs">Clubs</Link>
                <Link to="/">Events</Link>
                <Link to="/">ASSMU</Link>
                <Link to="/"> <img src={assmulogo} id = "logo" alt = "ASSMU logo"/> </Link>
                <Link to="/">Calendar</Link>
                <Link to="/">Resources </Link>
                <Link to="/contact">Contact</Link>

            </div>
        </nav>
    );
}
 
export default Navbar;