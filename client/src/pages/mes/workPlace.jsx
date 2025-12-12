import { useState, useCallback, useRef, useEffect } from "react";
import Inventory from "../../nodes/inventory";
import ProductionOrder from "../../nodes/productionOrder";
import Parts from "../../nodes/parts";
import Processing from "../../nodes/processing";
import Assembly from "../../nodes/assembly";
import FinalProduct from "../../nodes/finalProduct";

import { backgroundColor } from "./backgroundTheme/background";
import { color } from "./backgroundTheme/color";
import { variant } from "./backgroundTheme/variant";

import Ribbon from "./ribbon";
import { Maximize2, Minimize2 } from "lucide-react";

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

const nodeTypes = {
  inventory: Inventory,
  productionOrder: ProductionOrder,
  parts: Parts,
  processing: Processing,
  assembly: Assembly,
  finalProduct: FinalProduct,
};

const edgeTypes = { "custom-edge": CustomEdge };

export default function WorkPlace() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [bgColorKey, setBgColorKey] = useState("white");
  const [colorKey, setColorKey] = useState("dark");
  const [variantKey, setVariantKey] = useState("dots");

  const onNodesChange = useCallback(
    (changes) => setNodes((state) => applyNodeChanges(changes, state)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    const edge = { ...params, type: "custom-edge" };
    setEdges((eds) => addEdge(edge, eds));
  }, []);

  const fullscreenRef = useRef(null);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const handler = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleFullscreen = () => {
    const el = fullscreenRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  };

  return (
    <div ref={fullscreenRef} className="h-full w-full relative">
      <ReactFlow
        maxZoom={2}
        minZoom={0.1}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <MiniMap   nodeBorderRadius={50}
  nodeColor={(node) => {
  switch (node.type) {
    case "productionOrder":
      return "#3b82f6";
    case "inventory":
      return "#64748b";
      case "parts":
      return "#6366f1";
      case "processing":
      return "#10b981";
      case "assembly":
      return "#f59e0b";
      case "finalProduct":
        return "#84cc16"
    default:
      return "blue";
  }
}}></MiniMap>
        <Ribbon
          bgColorKey={bgColorKey}
          setBgColorKey={setBgColorKey}
          colorKey={colorKey}
          setColorKey={setColorKey}
          variantKey={variantKey}
          setVariantKey={setVariantKey}
        />

        <Background
          color={color[colorKey]}
          bgColor={backgroundColor[bgColorKey]}
          variant={variant[variantKey]}
        />

        <Controls className="scale-90">
          {!isFull && (
            <button onClick={handleFullscreen} className="react-flow__controls-button">
              <Maximize2  />
            </button>
          )}
          {isFull && (
            <button onClick={handleExitFullscreen} className="react-flow__controls-button">
              <Minimize2 />
            </button>
          )}
          


        </Controls>
      </ReactFlow>
    </div>
  );
}
