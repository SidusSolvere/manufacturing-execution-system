import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Contact from './pages/contact/contact.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Features from './pages/features/features.jsx';
import Register from './pages/registerCompany/registerCompany.jsx';
import WorkPlace from './pages/mes/workPlace.jsx'


function App() {


return(
  <>
  
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Nav/>
          <main className='m-20'>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/features" element={<Features/>}/>
              <Route path="/companyRegister" element={<Register/>}/>
              <Route path="/demo" element={<WorkPlace/>}/>
            </Routes>

          </main>

        <Footer/>
      </div>
  </>
);
}

export default App
