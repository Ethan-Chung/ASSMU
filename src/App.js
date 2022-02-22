import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import './App.css';
import Home from './Home';
import Contact from './Contact'
import NotFound from './components/NotFound';
import Clubs from './components/Clubs';
import Events from './Events';
import Assmu from './components/Assmu';
import Calendar from './Calendar';
import Resources from './Resources';
import ClubDetails from './components/ClubDetails';


function App() {
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
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path = "/clubs" element={<Clubs/>} />
          <Route path ='/clubs/:slug' element ={<ClubDetails data = {arr}/>} />
          <Route path = "/events" element={<Events/>} />
          <Route path = "/assmu" element={<Assmu/>} />
          <Route path = "/calendar" element={<Calendar/>} />
          <Route path = "/resources" element={<Resources/>} />
          <Route path = "/contact" element={<Contact />} />
          <Route path = "*" element={<NotFound />} /> 
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
