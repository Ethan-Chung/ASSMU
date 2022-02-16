import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from "react";

const Clubs = () => {
    const [info, setInfo] = useState('');
    const url = 'http://localhost:3001'
  
    useEffect(() => {
      axios.get(url, {
        'Content-Type':'text/html'     
      }).then(response => {
          setInfo(response.data)
          console.log(response.data)
        })
    }, [])
  
    const arr = Object.values(info)


    return ( 
        <div className="allclubs">
            {
            arr.map((clubs, i) => {
              return (
                <div className = "card" key = {i}>
                  <Link to = {`/clubs/${clubs.slug}`}>
                    <img src={`${clubs.metadata.hero.imgix_url}`} className = "clubimage" alt='clubimage'></img>
                    <div dangerouslySetInnerHTML={{__html:clubs.title}} className = "clubname"></div>
                  </Link>
                </div>
              )
            })
          }
        </div>
     );
}
 
export default Clubs;