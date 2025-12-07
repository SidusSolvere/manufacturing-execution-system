import { useState } from "react";
import { Position, Handle, useReactFlow } from "@xyflow/react";

function QualityCheck({ id, data }) {
  const { setNodes } = useReactFlow();

  //storing information about how quality is  checked on this product
  const [checkMethod, setCheckMethod] = useState(data?.checkMethod || "visual");
  const [passRate, setPassRate] = useState(data?.passRate || 90);
  const [retestRequired, setRetestRequired] = useState(data?.retestRequired || false);

  // when the user picks a different quality check method we need to save it
  const handleCheckMethodChange = (e) => {
    const newMethod = e.target.value;
    setCheckMethod(newMethod);
    
    // save the method choice to the node so reactflow remembers it
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, checkMethod: newMethod } } : node
      )
    );
  };

  // the pass rate tells us what percentage of products pass the quality check
  const handlePassRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPassRate(newRate);
    
    // we save the pass rate number to keep track of it
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, passRate: newRate } } : node
      )
    );
  };

  // if a product fails the test we can require it to be tested again
  const handleRetestChange = (e) => {
    const newRetest = e.target.checked;
    setRetestRequired(newRetest);
    
    // we save whether retest is needed or not
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, retestRequired: newRetest } } : node
      )
    );
  };

  return (
    <div className="p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-300">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-slate-900 mb-2">Quality Check</label>
        
        <div className="space-y-3">
          {/* Check Method Selection */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Method</label>
            <select
              value={checkMethod}
              onChange={handleCheckMethodChange}
              className="nodrag w-full px-3 py-2 border-2 border-yellow-200 rounded-lg text-sm font-medium"
            >
              <option value="visual">Visual Inspection</option>
              <option value="dimensional">Dimensional Check</option>
              <option value="strength">Strength Test</option>
              <option value="color">Color Verification</option>
              <option value="weight">Weight Check</option>
            </select>
          </div>

          {/* Pass Rate Input */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Pass Rate %</label>
            <input
              type="number"
              value={passRate}
              onChange={handlePassRateChange}
              min="0"
              max="100"
              step="1"
              className="nodrag w-full px-3 py-2 border-2 border-yellow-200 rounded-lg text-sm"
            />
          </div>

          {/* Retest Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="retest"
              checked={retestRequired}
              onChange={handleRetestChange}
              className="nodrag w-4 h-4 cursor-pointer"
            />
            <label htmlFor="retest" className="ml-2 text-xs font-medium text-gray-600 cursor-pointer">
              Retest if fails
            </label>
          </div>
        </div>

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

export default QualityCheck;
