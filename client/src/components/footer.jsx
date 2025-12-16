import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

function Footer(){
  const linkStyle = "text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm md:text-base hover:translate-x-0.5";
  const socialIconStyle = "w-5 h-5 text-slate-700 hover:text-white transition-all duration-300 cursor-pointer";
  
return(
<>
<div className='bg-gray-50 left-0 w-full border-t-2 border-slate-200 shadow-sm'>
  <div className="flex flex-col md:flex-row gap-10 md:gap-8 px-4 md:px-8 lg:px-12 py-10 md:py-12 items-start justify-between max-w-7xl mx-auto">
    
    <div className="flex flex-col gap-2 flex-shrink-0">
      <h1 className="text-2xl md:text-3xl text-blue-600 font-extrabold">MES</h1>
      <p className="text-slate-600 text-sm md:text-base">Manufacturing Execution System</p>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className='font-bold text-slate-900 text-base md:text-lg'>Product</h3>
      <div className="flex flex-col gap-2.5">
        <Link className={linkStyle} to="/">Home</Link>
        <Link className={linkStyle} to="/about">About</Link>
        <Link className={linkStyle} to="/features">Features</Link>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className='font-bold text-slate-900 text-base md:text-lg'>Support</h3>
      <div className="flex flex-col gap-2.5">
        <Link className={linkStyle} to="/contact">Contact</Link>
        <a href="tel:+919876543210" className={linkStyle}>+91 9876543210</a>
        <a href="mailto:support@mes.com" className={linkStyle}>Email</a>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className='font-bold text-slate-900 text-base md:text-lg'>Follow</h3>
      <div className="flex flex-row gap-3">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:shadow-md" aria-label="Facebook">
          <Facebook className={socialIconStyle} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:shadow-md" aria-label="Instagram">
          <Instagram className={socialIconStyle} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:shadow-md" aria-label="Twitter">
          <Twitter className={socialIconStyle} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:shadow-md" aria-label="LinkedIn">
          <Linkedin className={socialIconStyle} />
        </a>
      </div>
    </div>

  </div>
  
  <div className="border-t border-slate-200 bg-slate-100 px-4 md:px-8 lg:px-12 py-5">
    <p className="text-center text-slate-600 text-sm md:text-base max-w-7xl mx-auto">
      &copy; 2024 Manufacturing Execution System. All rights reserved.
    </p>
  </div>
</div>
</>
);

}
export default Footer
