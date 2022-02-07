import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './App.css';

function App() {
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
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <div>
          <h1>Assmu Website</h1>
          <p>
            {
              arr.map((blogs, i) => {
                return (
                  <div>
                    <img src={`${blogs.metadata.hero.imgix_url}`} key={i} alt='something'></img>
                    <div dangerouslySetInnerHTML={{__html:blogs.content}}></div>
                  </div>
                )
              })
            }
          </p>
        </div>
      </div> 
    </div>
    </Router>
  );
}

export default App;
