import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div>
      <button className="bg-gray-100 text-xl font-bold text-blue-800 rounded-b-2xl p-4 shadow-2xl mx-4 hover:bg-gray-200 " onClick={toggle}><h2>Nodes</h2></button>

      <div
        className=" bg-gray-100 w-60 shadow-2xl absolute transition-all duration-600 z-10 rounded-2xl px-8 "
        style={{
          left: open ? "0" : "-100%",
        }}
      >
        
        <ul>
          <li className="px-4 my-4 rounded-2xl font-medium hover:bg-gray-200"><button>Production Order</button></li>
          <li className="px-4 my-4 rounded-2xl font-medium hover:bg-gray-200"><button>Inventory</button></li>
          
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
