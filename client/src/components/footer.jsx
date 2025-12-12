import React from 'react';
import { Link } from 'react-router-dom';


function Footer(){
  const linkStyle = " py-2 text-black/60 font-medium hover:text-black text-xs md:text-sm ";
return(
<>
<div className='bottom-0 bg-gray-100 left-0 w-full shadow-2xl'>
  <div className="flex flex-col md:flex-row gap-4 md:gap-12 rounded-xl px-4 md:px-6 py-6 md:py-8 shadow-2xl">
    <div className="flex w-full md:w-auto">
      <h1 className="text-2xl md:text-4xl text-blue-600 font-extrabold">MES</h1>
    </div>
    <div className="flex flex-col gap-2 md:ml-auto items-center">
      <h3 className='font-bold text-lg md:text-xl text-black'>Product</h3>
      <div className="flex flex-row flex-wrap gap-4 md:gap-6 justify-center">
        <Link className={linkStyle} to="/">Home</Link>
        <Link className={linkStyle} to="/about">About</Link>
        <Link className={linkStyle} to="/features">Features</Link>
      </div>
    </div>
    <div className="flex flex-col gap-2 items-center">
      <h3 className='font-bold text-lg md:text-xl text-black'>Contact Us</h3>
      <div className="flex flex-row flex-wrap gap-4 md:gap-6 justify-center">
        <Link className={linkStyle} to="/contact">Contact</Link>
        <div className={linkStyle}>123456789</div>
        <div className={linkStyle}>addr</div>
      </div>
    </div>
  <div className="flex flex-col gap-2 items-center">
      <h3 className='font-bold text-lg md:text-xl text-black'>Follow Us</h3>
      <div className="flex flex-row flex-wrap gap-4 md:gap-6 justify-center">
        <a className={linkStyle}>Facebook</a>
        <a className={linkStyle}>insta</a> 
        <a className={linkStyle}>twitter</a>
      </div>
    </div>

</div>
</div>
</>
);

}
export default Footer
