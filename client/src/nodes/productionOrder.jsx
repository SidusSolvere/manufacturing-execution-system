import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useReducer, useCallback, useState } from "react";
import DeleteButton from "./deleteNode";
import { ChevronDown,CircleChevronRight} from 'lucide-react';


function ProductionOrder({ id, data }) {
  const { setNodes } = useReactFlow();
  const [toggle,setToggle]=useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case "updateField":
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  }

  const initialState = {
    itemName: data?.itemName || "",
    quantity: data?.quantity || 1,
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    customerName: data?.customerName || "",
    status: data?.status || "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  


  const updateNodeData = useCallback(
    (field, value) => {
      dispatch({ type: "updateField", field, value });

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, [field]: value } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div className=" bg-blue-500 rounded-3xl shadow-2xl ">

      
        <h1 className="p-4 text-xl font-semibold  text-white rounded-t-3xl">Production Order</h1> 
        <div className="absolute right-4 top-4">
                  <DeleteButton />
                </div>
        
<div className="relative rounded-3xl p-4 bg-gray-50 ">
  
      <div className="flex ">
        <div className="flex flex-col w-full">
          <label>Item Name:</label>
          <input
            type="text"
            value={state.itemName}
            onChange={(e) => updateNodeData("itemName", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>

        <div className="flex flex-col">
          <label>Quantity:</label>
          <input
            type="number"
            value={state.quantity}
            onChange={(e) => updateNodeData("quantity", Number(e.target.value))}
            className="nodrag m-2 border rounded p-1 w-20"
          />
        </div>
        <button
  onClick={() => setToggle(!toggle)}
  className={` transition-transform duration-600 
    ${toggle ? "rotate-180" : "rotate-0"}
  `}
>
  <ChevronDown />
</button>
        
      </div>
<div
  className={`
    transition-all duration-600 overflow-hidden
    ${toggle ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
  `}
>
      <div className="flex ">
        <div className="flex flex-col w-[50%]">
          <label>Start Date:</label>
          <input

            type="date"
            value={state.startDate}
            onChange={(e) => updateNodeData("startDate", e.target.value)}
            className="nodrag m-2 border rounded p-1 "
          />
        </div>

        <div className="flex flex-col w-[50%]">
          <label>End Date:</label>
          <input
            type="date"
            value={state.endDate}
            onChange={(e) => updateNodeData("endDate", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>
      </div>

      <div className="flex ">
        <div className="flex flex-col">
          <label>Customer:</label>
          <input
            type="text"
            value={state.customerName}
            onChange={(e) => updateNodeData("customerName", e.target.value)}
            className="nodrag m-2 border rounded p-1 "
          />
        </div>

        <div className="flex flex-col">
          <label>Status:</label>
          <input
            type="text"
            value={state.status}
            onChange={(e) => updateNodeData("status", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>
      </div>
</div>
</div>
      <Handle type="source" position={Position.Right} style={{
          background: 'none',
          border: 'none',
          width: '1em',
          height: '1em',
          
        }} >
        <CircleChevronRight className="bg-gray-50  rounded-full hover:bg-gray-300 hover:scale-105"/>
      </Handle>
    </div>
  );
}

export default ProductionOrder;
