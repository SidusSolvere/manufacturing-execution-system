import { useReactFlow } from "@xyflow/react";
import { useRef } from "react";

export default function useAddNode() {
  const { setNodes } = useReactFlow();
  const idIncrement = useRef(3);

  const addNode = (type, x = 100, y = 100) => {
    const newId = idIncrement.current;
    idIncrement.current += 1;

    let defaultData = {};

    if (type === "inventory") {
      defaultData = { amount: 0 };
    } else if (type === "productionOrder") {
      defaultData = {
        name: "",
        quantity: 1,
        startDate: "",
        endDate: "",
      };
    } else {
      alert(`no type named ${type}`);
      return;
    }

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: String(newId),
        type,
        position: { x, y },
        data: defaultData,
      },
    ]);
  };

  return addNode;
}
