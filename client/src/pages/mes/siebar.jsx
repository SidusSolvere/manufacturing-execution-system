import { useState, useRef } from "react";
import { useReactFlow } from "@xyflow/react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const { setNodes } = useReactFlow();//to get the node values from the node array

  // this value must be 1+the max value of default nodes array, will add functionality to get previous id later, for now its 1 as nodes.jsx is empty
  const idIncrement = useRef(1);

  const addNode = (type, x = 100, y = 100) => {//default values will add popup to change the position
    const newId = idIncrement.current;
    idIncrement.current += 1;

    let defaultData = {};//check default data and node format from node.json

    if (type === "inventory") {
      defaultData = { amount: 0 };

    } else if (type === "productionOrder") {
      defaultData = {
        name: "",
        quantity: 1,
        startDate: "",
        endDate: "",
      };

    } else {
      alert(`no type named ${type}`);
      return;
    }

    setNodes((prevNodes) => {
      const updatedNodes = [
        ...prevNodes,
        {
          id: String(newId), // string as recommended id type is string in documentation
          type: type,
          position: { x, y },
          data: defaultData,
        },
      ];//main function to add the node to the array, the array is handled by react flow internally so no need to worry about updating it and so on 

      console.log("Updated nodes:", updatedNodes); //check the array 
      return updatedNodes;
    });
  };

  return (
    <div className="absolute z-10">
      <button
        className="bg-gray-100 text-xl font-bold text-blue-800 rounded-b-2xl p-4 shadow-2xl mx-4 hover:bg-gray-200"
        onClick={toggle}
      >
        <h2>Nodes</h2>
      </button>

      <div
        className="bg-gray-100 w-60 shadow-2xl absolute transition-all duration-600 z-10 rounded-2xl px-8"
        style={{
          left: open ? "0" : "-200%",
        }}
      >
        <ul>
          <li className="px-4 my-4 rounded-2xl font-medium hover:bg-gray-200">
            <button onClick={() => addNode("productionOrder", 200, 100)}>
              Production Order
            </button>
          </li>

          <li className="px-4 my-4 rounded-2xl font-medium hover:bg-gray-200">
            <button onClick={() => addNode("inventory", 300, 150)}>
              Inventory
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
