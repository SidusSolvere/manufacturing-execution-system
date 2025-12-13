import { useReactFlow, useNodeId } from "@xyflow/react";
import { CircleX } from 'lucide-react';
export default function DeleteButton() {
  const { deleteElements, getNode } = useReactFlow();
  const nodeId = useNodeId();   

  const handleDelete = () => {
    const node = getNode(nodeId);
    if (node) {
      deleteElements({ nodes: [node] });
    }
  };
console.log(nodeId);

  return (
    <button
      onClick={handleDelete}
      className="bg-black/20 backdrop-blur-xs text-white font-semibold rounded-full  hover:bg-black/50  hover:scale-105 "
    >
         <CircleX />


    </button>
  );
}
