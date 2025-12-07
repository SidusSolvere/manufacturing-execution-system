import { useState, useRef } from "react";
import { useReactFlow } from "@xyflow/react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const { setNodes, getEdges } = useReactFlow(); // getEdges added

  // this value must be 1+the max value of default nodes array, will add functionality to get previous id later
  const idIncrement = useRef(1);

  const addNode = (type, x = 100, y = 100) => {
    const newId = idIncrement.current;
    idIncrement.current += 1;

    let defaultData = {};
    if (type === "inventory") {
      defaultData = { amount: 0 };
    } else if (type === "productionOrder") {
      defaultData = { name: "", quantity: 1, startDate: "", endDate: "" };
    } else if (type === "parts") {
      defaultData = { amount: 0, pn: "", sku: "",total:0 ,name :""};
    } else {
      alert(`no type named ${type}`);
      return;
    }

    setNodes((prevNodes) => {
      const updatedNodes = [
        ...prevNodes,
        { id: String(newId), type, position: { x, y }, data: defaultData },
      ];

      console.log("Updated nodes:", updatedNodes);

      const edges = getEdges(); // get current edges array
      console.log("Current edges:", edges);

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

          <li className="px-4 my-4 rounded-2xl font-medium hover:bg-gray-200">
            <button onClick={() => addNode("parts", 400, 200)}>Parts</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
