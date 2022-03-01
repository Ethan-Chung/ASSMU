import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Navbars from './components/Navbar';
import './App.css';
import Home from './components/Home';
import Contact from './components/Contact'
import NotFound from './components/NotFound';
import Clubs from './components/Clubs';
import Assmu from './components/Assmu';
import Resources from './components/Resources';
import ClubDetails from './components/ClubDetails';
import Events from './components/Events';
import Calendar from './components/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <Navbars />
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
