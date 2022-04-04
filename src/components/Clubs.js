import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { InputAdornment } from '@mui/material';


const Clubs = () => {
    const [info, setInfo] = useState('');
    const [inputText, setInputText] = useState("");
    const url = 'http://localhost:3001'

    //allows input and turns them lowercase
    let inputHandler = (e) => {
      var lowerCase  = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
  
    useEffect(() => {
      axios.get(url, {
        'Content-Type':'application/json'     
      }).then(response => {
          setInfo(response.data)
          console.log(response.data)
        })
    }, [])
    
    //filters through the values by inputed text and allows it to be searchable through title
    const filteredData = Object.values(info).filter((el) => {
      if (inputText === ''){
        return el;
      } else {
        return el.title.toLowerCase().includes(inputText)
      }
    })


    return ( 
      <div>
        <h1 className = "tabHeader">Clubs</h1>
        <div className = "clubGrid">
          <div className="clubSideBox">
            <div className="search">            
              <TextField 
                id="outlined-basic" 
                onChange={inputHandler} 
                variant="standard" 
                label="Search" 
                InputProps={{
                  endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>
                }}
              /> 
            </div>
          </div>
          <div className="allclubs">
              {
              //img src will be club logo
              //club.title is each club name
              filteredData.map((clubs, index) => {
                return (
                  <div className = "card" key = {index}>
                    <Link to = {`/clubs/${clubs.slug}`}>
                      <img src={`${clubs.metadata.club_picture.imgix_url}`} className = "clubimage" alt='clubimage'></img>
                      <div className = "clubname"> {clubs.title} </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>  
     );
}
 
export default Clubs;