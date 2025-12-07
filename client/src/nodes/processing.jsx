import { useState } from "react";
import { Position, Handle, useReactFlow } from "@xyflow/react";

function Processing({ id, data }) {
  const { setNodes } = useReactFlow();

  //keeping track of different things that happen in the processing unit
  const [processType, setProcessType] = useState(data?.processType || "cutting");
  const [duration, setDuration] = useState(data?.duration || 30);
  const [materialLoss, setMaterialLoss] = useState(data?.materialLoss || 5);

  // when user changes what kind of process is happening we update that and save it to the node data
  const handleProcessChange = (e) => {
    const newType = e.target.value;
    setProcessType(newType);
    
    //updating the node in the reactflow so it remembers the change
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, processType: newType } } : node
      )
    );
  };

  // if the user wants to change how many minutes this process takes we handle it here
  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);
    
    //updating the node data so it stores the new duration time
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, duration: newDuration } } : node
      )
    );
  };

  // user may wants to change how much material is wasted or lost during the process
  const handleLossChange = (e) => {
    const newLoss = parseFloat(e.target.value);
    setMaterialLoss(newLoss);
    
    // updating the node with new loss percentage
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, materialLoss: newLoss } } : node
      )
    );
  };

  return (
    <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-300">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-slate-900 mb-2">Processing Unit</label>
        
        <div className="space-y-3">
          {/* Process Type Selection */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Type</label>
            <select
              value={processType}
              onChange={handleProcessChange}
              className="nodrag w-full px-3 py-2 border-2 border-blue-200 rounded-lg text-sm font-medium"
            >
              <option value="cutting">Cutting</option>
              <option value="stitching">Stitching</option>
              <option value="assembly">Assembly</option>
              <option value="welding">Welding</option>
              <option value="painting">Painting</option>
            </select>
          </div>

          {/* Duration Input */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Duration (mins)</label>
            <input
              type="number"
              value={duration}
              onChange={handleDurationChange}
              min="5"
              step="5"
              className="nodrag w-full px-3 py-2 border-2 border-blue-200 rounded-lg text-sm"
            />
          </div>

          {/* Material Loss */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Loss %</label>
            <input
              type="number"
              value={materialLoss}
              onChange={handleLossChange}
              min="0"
              max="100"
              step="0.5"
              className="nodrag w-full px-3 py-2 border-2 border-blue-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

export default Processing;
