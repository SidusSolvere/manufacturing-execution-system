import { useState, useCallback } from "react";
import Inventory from "../../nodes/inventory";

import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes } from "./nodes";
import { initialEdges } from "./edges";
import CustomEdge from "../../nodes/customEdge";

const nodeTypes = { inventory: Inventory };
const edgeTypes = { "custom-edge": CustomEdge };

export default function WorkPlace() {
  const [nodes, setNodes] = useState(initialNodes); //use state is used here to re render the node when the position is changed, there are prebuilt function in the xyflow lib which allow these changes to be done, they are mentioned in the use callback section where the dom elements are manupluated
  const [edges, setEdges] = useState(initialEdges); // same as above
  const onNodesChange = useCallback(
    (changes) =>
      setNodes((state) => applyNodeChanges(changes, state)),
    []
  );//usually use node state is used, but by using callback here we can add custom functionality like saving state and adding to databse


  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );//same as onNodeChnage
  const onConnect = useCallback((params) => {
    const edge = { ...params, type: "custom-edge" };
    setEdges((eds) => addEdge(edge, eds));
  }, []);//params are in custom edge,  eds is snapshot so it can provide the updated array, its for custom edges 

  

  return (
    <div className="h-full w-full">
      <div className="flex absolute z-10 ">
       
      </div>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        //fitView
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
