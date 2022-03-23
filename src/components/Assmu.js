import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from "react";

const Assmu = () => {

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

    const arr = Object.values(info)

    return ( 
        <div className="allOfficers">
            {
            //img src will be club logo
            //club.title is each club name
            arr.map((officer, index) => {
              return (
                <div className = "officers" key = {index}>
                    <div className="officerBundle">
                        <p className="officerName">{officer.title}</p>
                        <p className="officerRole">{officer.metadata.officer_role}</p>
                    </div>
                    <img src={`${officer.metadata.hero.imgix_url}`} className = "officerImage" alt='clubimage'></img>
                    <div dangerouslySetInnerHTML={{__html: officer.content}} className="officerDescription"></div>
                </div>
                
              )
            })
          }
        </div>
     );
}
 
export default Assmu;