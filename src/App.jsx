import Navbar from "./components/Navbar";
import React, { useState } from 'react';
//import {Routes,Route} from "react-router-dom"
import Signin from "./pages/Signin"
import Home1 from "./pages/Home1"
//import Profile from "./pages/profile"
import AdminSignin from "./pages/adminsignin"
import Admin from "./pages/admin"





import LeftNavbar from './components/LeftNavbar';
import AdminNavbar from './components/AdminNavbar';
 import Home from './components/Home';
 import Vote from './components/Vote';
import AddCandidate from './components/AddCandidate';
import Election from './components/election';
// import Results from './components/Results';
// import Help from './components/Help';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const isInsideProfile = location.pathname.startsWith('/profile');


  return (
    <>
 {!isInsideProfile && <Navbar />}
      {!isInsideProfile && (
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/adminsignin" element={<AdminSignin />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </div>
      )}
      <Routes>
        <Route path="/profile/*" element={
          <div className="App">
            <LeftNavbar className="LeftNavbar"/>
            <div className="MainContent">
        
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/candidate" element={<AddCandidate />} />
              <Route path="/election" element={<Election />} />
        </Routes>
      </div>
          </div>
        } />
      </Routes>
      <Routes>
        <Route path="/admin/*" element={
          <div className="App">
            <AdminNavbar className="AdminNavbar"/>
            <div className="AdminContent">
        
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/candidate" element={<AddCandidate />} />
              <Route path="/election" element={<Election />} />
        </Routes>
      </div>
          </div>
        } />
      </Routes>
    </>
  );
};

export default App;