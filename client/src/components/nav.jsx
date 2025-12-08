import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav(){
  const [isOpen, setIsOpen] = useState(false);
  
  const buttonStyle = "px-3 py-2 text-black/60 font-medium hover:text-black hover:bg-blue-600/50 hover:rounded-lg text-sm md:text-base";
  
  return(
    <>
    <div className='bg-gray-100 w-full'>
  <nav className='flex items-center justify-between p-3 md:p-4 gap-3 md:gap-6 border-default shadow-2xl rounded-xl'>
    
    {/* Logo */}
    <h1 className="text-2xl md:text-4xl text-blue-600 font-extrabold flex-shrink-0">
      MES 
    </h1>
    
    {/* Hamburger Menu Button - Mobile Only */}
    <button 
      className="md:hidden flex flex-col gap-1.5 focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={`block w-6 h-0.5 bg-blue-600 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-blue-600 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-blue-600 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
    </button>
    
    {/* Desktop Navigation - Hidden on Mobile */}
    <div className='hidden md:flex gap-3 lg:gap-6'>
      <Link className={buttonStyle} to="/">Home</Link>
      <Link className={buttonStyle} to="/about">About</Link>
      <Link className={buttonStyle} to="/features">Features</Link>
      <Link className={buttonStyle} to="/demo">Demo</Link>
      <Link className={buttonStyle} to="/contact">Contact</Link>
      <Link className={buttonStyle} to="/companyRegister">Company Reg</Link>
      <Link className={buttonStyle} to="/login">Login</Link>
      <Link className={buttonStyle} to="/signup">Signup</Link>
    </div>
  </nav>
  
  {/* Mobile Navigation - Visible only when hamburger is clicked */}
  {isOpen && (
    <div className='md:hidden bg-white border-t shadow-lg'>
      <div className='flex flex-col p-3 gap-2'>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/features" onClick={() => setIsOpen(false)}>Features</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/demo" onClick={() => setIsOpen(false)}>Demo</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/companyRegister" onClick={() => setIsOpen(false)}>Company Reg</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        <Link className={`${buttonStyle} block px-4 py-2 hover:bg-gray-100 rounded`} to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
      </div>
    </div>
  )}
</div>
    
    </>
  );
}

export default Nav