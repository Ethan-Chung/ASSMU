// the Link component gives us single page applications, where the entire page won't be reloaded when a user navigates from
// one page to another. Only the content area will be updated,
// inside Link components there is still an anchor (<a> tag), but this anchor has a handler for the onClick event. When we click
// these links the handler is called and this function prevents the default behavior of an anchor. The anchor will only update
// the url specified in the Link component
import { Link } from 'react-router-dom';
import assmulogo from './assmulogo.jpg';
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
                <Link to="/login">Login</Link>

            </div>
        </nav>
    );
}
 
export default Navbar;