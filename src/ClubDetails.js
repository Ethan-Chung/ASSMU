import React from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';


const ClubDetails = () => {

    const {slug} = useParams();
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
            {slug}
        </div>
     );
}
 
export default ClubDetails;