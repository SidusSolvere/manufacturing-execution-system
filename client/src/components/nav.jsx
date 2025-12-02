import React from 'react';
import { Link } from 'react-router-dom';

function Nav(){
const buttonStyle = "px-4 py-1 text-black/60 font-medium hover:text-black hover:bg-blue-600/50 hover:rounded-xl inline-block";
  return(
    <>
    <div className='bg-gray-100 fixed w-full  '>
  <nav className=' flex flex-wrap items-center justify-between  p-4 gap-6 border-default shadow-2xl rounded-xl '>
    <h1 className="text-4xl  text-blue-600 font-extrabold">
    MES 
  </h1>
  <div className='flex gap-6'>
    <Link className={buttonStyle} to="/">Home</Link>
    <Link className={buttonStyle} to="/about">About</Link>
    <Link className={buttonStyle} to="/features">Features</Link>
    <Link className={buttonStyle} to="/contact">Contact</Link>
    <Link className={buttonStyle} to="/login">Login</Link>
    <Link className={buttonStyle} to="/signup">Signup</Link>
    </div>
  </nav>
</div>

    
    </>
  );
}

export default Nav