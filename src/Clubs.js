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
            arr.map((blogs, i) => {
              return (
                <div className = "card">
                  <img src={`${blogs.metadata.hero.imgix_url}`} className = "clubimage" alt='clubimage'></img>
                  <div dangerouslySetInnerHTML={{__html:blogs.title}} className = "clubname"></div>
                  <button className="clubinfo">More info</button>
                </div>
              )
            })
          }
        </div>
     );
}
 
export default Clubs;