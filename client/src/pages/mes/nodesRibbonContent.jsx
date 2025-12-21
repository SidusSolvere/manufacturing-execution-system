import { useRef } from "react";
import { useReactFlow } from "@xyflow/react";

import {
  ClipboardClock,
  Boxes,
  Warehouse,
  Circle,
  Package2,
  MoveUpLeft,
  CircleCheckBig,
  PackageOpen,
} from "lucide-react";

function NodesRibbonContent( socketRef, isCollaborative, activeProjectId ) {


  const { getNodes,setNodes,getEdges } = useReactFlow();
  
  const getNextId = () => {
      const nodes = getNodes();
      if (!nodes.length) return "1";

      const maxId = Math.max(...nodes.map(n => Number(n.id)));
      return String(maxId + 1);
    };
  const addNode = (type) => {
    const newNode = {
      id: getNextId(),
      type,
      position: { x: 100, y: 100 },
      data: {},
    };

    setNodes((prev) => {
      const updated = [...prev, newNode];

      if (isCollaborative && socketRef.current && activeProjectId) {
        socketRef.current.emit("nodes:update", {
          projectId: activeProjectId,
          nodes: updated,
        });
        console.log('Emitted new nodes via socket:', updated);
      }
       console.log("Updated nodes:", updated);
      console.log("Edges:", getEdges());
      return updated;
    });
  };

  return (
    <div className="flex gap-6">
      <RibbonButton
        icon={<ClipboardClock  />}
        label="Production"
          hoverClass="hover:bg-blue-200"

        onClick={() => addNode("productionOrder", 200, 100)}
      />

      <RibbonButton
        icon={<Boxes />}
        label="Parts"
          hoverClass="hover:bg-indigo-200"

        onClick={() => addNode("parts", 400, 200)}
      />

      <RibbonButton
        icon={<Warehouse />}
        label="Inventory"
          hoverClass="hover:bg-slate-200"

        onClick={() => addNode("inventory", 300, 150)}
      />

      <RibbonButton
        label="Processing"
          hoverClass="hover:bg-emerald-200"

        onClick={() => addNode("processing", 500, 250)}
        icon={
          <div className="relative flex flex-col items-center  " >
            <Package2 className="relative top-0 "strokeWidth={2.5}  size={15}/>
            <div className="border-2  rounded-full flex ">
              <Circle className="mx-1" strokeWidth={2.5} size={5}/>
              <Circle className="mx-1" strokeWidth={2.5} size={5}/>
              <Circle className="mx-1" strokeWidth={2.5} size={5}/>
            </div>
          </div>
        }
      />

      <RibbonButton
        label="Assembly"
          hoverClass="hover:bg-amber-200"

        onClick={() => addNode("assembly", 600, 300)}
        icon={
    <div className=" flex items-center justify-center">
               <div className="grid grid-cols-3 gap-0.5">

            <MoveUpLeft className="rotate-180 col-start-1"strokeWidth={5} size={8}/>
            <MoveUpLeft className="rotate-270 col-start-3" strokeWidth={5} size={8}/>
            <Package2 className="scale-150 col-start-2" strokeWidth={2.5} size={8}/>
            <MoveUpLeft className="rotate-90 col-start-1" strokeWidth={5} size={8}/>
            <MoveUpLeft className="col-start-3" strokeWidth={5} size={8}/>
          </div>
          </div>
        }
      />

      <RibbonButton
        label="Final"
          hoverClass="hover:bg-lime-200"

        onClick={() => addNode("finalProduct", 700, 350)}
        icon={
            <PackageOpen  />
        }
      />
    </div>
  );
}

export default NodesRibbonContent;
function RibbonButton({ icon, label, onClick, hoverClass }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-2xl  font-medium text-s w-20 p-2
                  transition-colors
                  ${hoverClass}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
