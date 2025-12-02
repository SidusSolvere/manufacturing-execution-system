import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';


import './App.css'

function App() {


return(
  <>
  <Header/>
  <Nav/>

  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    
  </Routes>


  

  <Footer/>
  </>
);
}

export default App
