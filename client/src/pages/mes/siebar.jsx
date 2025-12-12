import { useState, useRef } from "react";
import { useReactFlow } from "@xyflow/react";
import nodeTemplates from "../../nodes/initialNodes";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const { setNodes, getEdges } = useReactFlow();

  const idIncrement = useRef(1);

  const addNode = (type, x = 100, y = 100) => {
    if (!nodeTemplates[type]) {
      alert(`Node type "${type}" is not valid`);
      return;
    }

    const newId = idIncrement.current++;
    const defaultData = JSON.parse(JSON.stringify(nodeTemplates[type].data));

    setNodes((prevNodes) => {
      const updatedNodes = [
        ...prevNodes,
        {
          id: String(newId),
          type,
          position: { x, y },
          data: defaultData,
        },
      ];

      console.log("Updated nodes:", updatedNodes);
      console.log("Edges:", getEdges());

      return updatedNodes;
    });
  };

  return (
    <div className="relative z-10">
      <button
        className="bg-gray-100 text-xl font-bold text-blue-800 rounded-b-2xl p-4 shadow-2xl mx-4 hover:bg-gray-200"
        onClick={toggle}
      >
        <h2>Nodes</h2>
      </button>

      <div
        className="bg-gray-100 w-60 shadow-2xl absolute transition-all duration-600 z-10 rounded-2xl px-8"
        style={{ left: open ? "0" : "-200%" }}
      >
        <ul>
          <li >
            <button className=" text-left px-2  my-4 w-full rounded-2xl font-medium hover:bg-blue-200 " onClick={() => addNode("productionOrder", 200, 100)}>
              Production Order
            </button>
          </li>

          

          <li >
            <button className=" text-left px-2 my-4 w-full rounded-2xl font-medium hover:bg-indigo-200" onClick={() => addNode("parts", 400, 200)}>Parts</button>
          </li>
          <li >
            <button className=" text-left px-2 my-4 w-full rounded-2xl font-medium hover:bg-slate-200" onClick={() => addNode("inventory", 300, 150)}>
              Inventory
            </button>
          </li>

          <li>
            <button  className=" text-left px-2 my-4 w-full rounded-2xl font-medium hover:bg-emerald-200" onClick={() => addNode("processing", 500, 250)}>
              Processing
            </button>
          </li>
          

          <li >
            <button className=" text-left px-2 my-4 w-full rounded-2xl font-medium hover:bg-amber-200" onClick={() => addNode("assembly", 600, 300)}>
              Assembly
            </button>
          </li>

          <li >
            <button className=" text-left px-2 my-4 w-full rounded-2xl font-medium hover:bg-lime-200" onClick={() => addNode("finalProduct", 700, 350)}>
              Final Product
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
