import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Contact from './pages/contact/contact.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Features from './pages/features/features.jsx';



function App() {


return(
  <>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/features" element={<Features/>}/>
    
  </Routes>


  

  <Footer/>
  </>
);
}

export default App
