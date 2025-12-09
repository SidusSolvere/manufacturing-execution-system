import { useReactFlow, useNodeId } from "@xyflow/react";

export default function DeleteButton() {
  const { deleteElements, getNode } = useReactFlow();
  const nodeId = useNodeId();   

  const handleDelete = () => {
    const node = getNode(nodeId);
    if (node) {
      deleteElements({ nodes: [node] });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      X
    </button>
  );
}
