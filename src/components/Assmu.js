import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from "react";

const Assmu = () => {

    const [info, setInfo] = useState('');
    const url = 'http://localhost:3001'
  
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
        <div className="allAssmu">
            {
            //img src will be club logo
            //club.title is each club name
            arr.map((assmu, index) => {
              return (
                <div className = "card" key = {index}>
                  <Link to = {`/assmu/${assmu.slug}`}>
                    <img src={`${assmu.metadata.hero.imgix_url}`} className = "clubimage" alt='clubimage'></img>
                    <div className = "clubname"> {assmu.title} </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
     );
}
 
export default Assmu;