import { useState, useCallback } from "react";
import Inventory from "../../nodes/inventory";

import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes } from "./nodes";
import { initialEdges } from "./edges";

  
const nodeTypes = {  inventory : Inventory };


export default function WorkPlace() {
  const[nodes,setNodes]= useState(initialNodes); //use state is used here to re render the node when the position is changed, there are prebuilt function in the xyflow lib which allow these changes to be done, they are mentioned in the use callback section where the dom elements are manupluated 
  const[edges,setEdges]= useState(initialEdges); // same as above
  const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  [],
);

const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  [],
);
const onConnect = useCallback(
  (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  [],
);
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };// a temporary way to display more elements will be changed when an add node compoenet is added later 
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="h-full w-full">
      <div className="flex absolute z-10 ">
        <button className="p-4 m-4 bg-amber-300 " onClick={increment}>
          add Node
        </button>
        <button className="p-4 m-4  bg-amber-300 " onClick={decrement}>
          remove Node
        </button>
      </div>
      <ReactFlow nodes={nodes.slice(0,count)}
            nodeTypes={nodeTypes}

  edges={edges} onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  //fitView   
  onConnect={onConnect}
>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
