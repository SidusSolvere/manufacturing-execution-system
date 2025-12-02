import React from 'react';
import { Link } from 'react-router-dom';


function Footer(){
  const linkStyle = " py-2 text-black/60 font-medium hover:text-black ";
return(
<>
<div className='fixed bottom-0  left-0 w-full'>
  <div className="flex gap-20  rounded-3xl m-4 p-4 shadow-2xl ">
    <div className="flex w-[60%]">
      <h1 className="text-4xl text-blue-600 font-extrabold">MES</h1>
    </div>
    <div className="flex flex-col">
      <h3 className='font-bold text-xl text-black'>Product</h3>
      <Link className={linkStyle} to="/">Home</Link>
    <Link className={linkStyle} to="/about">About</Link>
    <Link className={linkStyle} to="/features">Features</Link>
    
    </div>
    <div className="flex flex-col">
      <h3 className='font-bold text-xl text-black'>Contact Us</h3>
      <Link className={linkStyle} to="/contact">Contact</Link>
      <div className={linkStyle}>123456789</div>
      <div className={linkStyle}>addr</div> 
    </div>
  <div className="flex flex-col">
      <h3 className='font-bold text-xl text-black'>Follow Us</h3>
      <a className={linkStyle}>Facebook</a>
      <a className={linkStyle}>insta</a> 
      <a className={linkStyle}>twitter</a> 
    </div>

</div>
</div>
</>
);

}
export default Footer
