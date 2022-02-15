import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './App.css';
import Home from './Home';
import Contact from './Contact'
import NotFound from './NotFound';
import Clubs from './Clubs';
import Events from './Events';
import Assmu from './Assmu';
import Calendar from './Calendar';
import Resources from './Resources';
import LoginForm from './Components/loginForm';


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
        <Routes>
          {/* login page */}
          <Route path='/login' element={ <LoginForm /> } />

          <Route exact path="/" element={<Home />} />
          <Route path = "/clubs" element={<Clubs/>} />
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
