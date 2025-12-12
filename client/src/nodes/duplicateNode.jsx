import { Copy } from "lucide-react";
import { useReactFlow, useNodes } from "@xyflow/react";

function DuplicateNode({ NodeId }) {
  const { setNodes } = useReactFlow();
  const nodes = useNodes();
  
  const newId = nodes.length + 1;

  const duplicateNode = () => {
    const nodeData = nodes.find((n) => n.id === NodeId);

    if (!nodeData) {
      console.error("Node not found:", NodeId);
      return;
    }

    setNodes((prevNodes) => {
      const updatedNodes = [
        ...prevNodes,
        {
          id: String(newId),
          type: nodeData.type,
          position: {
            x: nodeData.position.x + 50,
            y: nodeData.position.y + 50,
          },
          data: { ...nodeData.data },
          measured: nodeData.measured ? { ...nodeData.measured } : undefined,
          selected: false,
          dragging: false,
        },
      ];
      return updatedNodes;
    });
  };

  return (
    <div>
      <button
        className="my-4 relative top-1 text-white p-1 hover:scale-110"
        onClick={duplicateNode}
      >
        <Copy />
      </button>
    </div>
  );
}

export default DuplicateNode;
