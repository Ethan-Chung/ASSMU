import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from "react";

const Resources = () => {

    const [info, setInfo] = useState('');
    const url = 'http://localhost:3001/officers'
  
    useEffect(() => {
      axios.get(url, {
        'Content-Type':'application/json'     
      }).then(response => {
          setInfo(response.data)
          console.log(response.data)
        })
    }, [])

    return ( 
        <div>
            <h1 className = "tabHeader">Resources</h1>
            <div className = "resources">
                <ul>
                    List of drinks
                    <li>bofa</li>
                </ul>
                <ul>
                    List of foods
                    <li>ethan</li>
                </ul>
                <ul>
                    List of places
                    <li>e10</li>
                </ul>
            </div>
        </div>
     );
}
 
export default Resources;