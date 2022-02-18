import React from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';



const ClubDetails = (data) => {
  //Future change is to make it so it does not need to make another api call
  //instead takes the data in from the app.js and use it
  const {slug} = useParams();
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
        <div>
            {arr.filter(card => card.slug === slug).map((card, index) => (
              <div key = {index} className="clubDetails">
                <img src= {card.metadata.hero.imgix_url} alt="club logo" className="clubDetailsImage" />
                <h1 className = "clubDetailsTitle">{card.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: card.content }} className = "clubDetailsContent"></p>
                <h2 className="clubDetailsSub">Additional information</h2>
                <p>
                  <strong>Club Contact: </strong>PLACEHOLDER
                  <br />
                  <strong>President: </strong>PLACEHOLDER
                  <br />
                  <strong>Vice President: </strong>PLACEHOLDER
                  <br />
                  <strong>Secretary: </strong>PLACEHOLDER
                  <br />
                  <strong>Treasurer: </strong>PLACEHOLDER
                  <br />
                  <strong>Advisor: </strong>PLACEHOLDER
                  <br />
                </p>
              </div>
            ))}
        </div>
     );
}
 
export default ClubDetails;