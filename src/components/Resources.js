import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from "react";

const Resources = () => {

    const [info, setInfo] = useState('');
    const url = 'http://localhost:3001/resources'
  
    useEffect(() => {
      axios.get(url, {
        'Content-Type':'application/json'     
      }).then(response => {
          setInfo(response.data)
          console.log(response.data)
        })
    }, [])

    const arr = Object.values(info)

    return ( 
        <div>
            <h1 className = "tabHeader">Resources</h1>
            <div className = "resources">
                <ul>
                    {
                        arr.map((links,index) => {
                            return (
                                <li><a href = {links.metadata.resource_link.url}>{links.title}</a></li>
                            )
                        })
                    }               
                </ul>
            </div>
        </div>
     );
}
 
export default Resources;