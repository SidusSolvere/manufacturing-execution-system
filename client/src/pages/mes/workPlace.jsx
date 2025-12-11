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
  finalProduct:FinalProduct,
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
      {!isFull && (
        <button
          onClick={handleFullscreen}
          className="absolute top-[10%] right-4 z-50 bg-gray-800 text-white px-3 py-1 rounded"
        >
          ⛶
        </button>
      )}

      {isFull && (
        <button
          onClick={handleExitFullscreen}
          className="absolute top-4 right-4 z-50 bg-red-600 text-white px-3 py-1 rounded"
        >
          ✕
        </button>
      )}

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <MiniMap  ></MiniMap>
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

        <Controls />
      </ReactFlow>
    </div>
  );
}
