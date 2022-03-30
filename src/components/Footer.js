import React from "react";

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="footerRows">
                {/* First Column */}
                <div className="col">
                    <h4>Info 1</h4>
                    <ul className="footerList">
                        <li>contact 1</li>
                        <li>contact 2</li>
                        <li>contact 3</li>
                    </ul>
                </div>
                {/* Second Column */}
                <div className="col">
                    <h4>Info 2</h4>
                    <ul className="footerList">
                        <li>contact 1</li>
                        <li>contact 2</li>
                        <li>contact 3</li>
                    </ul>
                </div>
                {/* Third Column */}
                <div className="col">
                    <h4>Info 3</h4>
                    <ul className="footerList">
                        <li>contact 1</li>
                        <li>contact 2</li>
                        <li>contact 3</li>
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;