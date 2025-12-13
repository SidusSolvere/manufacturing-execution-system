import { useReactFlow } from "@xyflow/react";
import { SeparatorVertical } from "lucide-react";

function AutoLayoutButton() {
  const { setNodes } = useReactFlow();

  const autoLayout = () => {
    setNodes(prevNodes => {
      const nodes = [...prevNodes];

      const prodNode = nodes.find(n => n.type === "productionOrder");
      if (!prodNode) return prevNodes;

      const prodWidth = prodNode.measured.width;
      const prodHeight = prodNode.measured.height;

      const partsNodes = nodes.filter(n => n.type === "parts");
      if (partsNodes.length === 0) return prevNodes;

      const count = partsNodes.length;

      const totalPartsHeight =
        partsNodes.reduce((sum, n) => sum + n.measured.height, 0) +
        (count - 1) * 50;

      let startY =
        0 + prodHeight / 2 - totalPartsHeight / 2; 

      const baseX = prodWidth + 200;

      const updated = nodes.map(n => {
        if (n.id === prodNode.id) {
          return {
            ...n,
            position: { x: 0, y: 0 },
          };
        }

        if (n.type === "parts") {
          const y = startY;
          startY += n.measured.height + 50;

          return {
            ...n,
            position: { x: baseX, y },
          };
        }

        return n;
      });

      return updated;
    });
  };

  return (
    <button onClick={autoLayout} className="react-flow__controls-button">
      <SeparatorVertical />
    </button>
  );
}

export default AutoLayoutButton;
