import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import React, { useCallback, useReducer, useEffect } from "react";
import DeleteButton from "./deleteNode";
import { CircleChevronRight,CircleAlert ,CircleCheckBig} from "lucide-react";
import DuplicateNode from "./duplicateNode";

const UNITS = {
  box: { label: "Box", amount: 100 },
  carton: { label: "Carton", amount: 1200 },
  roll: { label: "Roll", amount: 500 },
  pallet: { label: "Pallet", amount: 60000 },
  drum: { label: "Drum", amount: 200 },
};

function reducer(state, action) {
  return { ...state, ...action };
}

function Inventory({ id, data }) {
  const { setNodes } = useReactFlow();
  const connections = useNodeConnections(id);
  const sourceId = connections.find((c) => c.target === id)?.source;
  const sourceNode = useNodesData(sourceId);

  const totalRequired = Number(sourceNode?.data?.totalRequired || 0);

  const [state, dispatch] = useReducer(reducer, null, () => ({
    currentStock: data?.currentStock || 0,
    reservedStock: data?.reservedStock || 0,
    unit: data?.unit || "box",
    status: data?.status || "",
    total: data?.total || 0,
  }));

  const multiplier = UNITS[state.unit].amount;
  const finalStock = state.currentStock * multiplier;
  const effectiveStock = finalStock * (1 - state.reservedStock / 100);
  const isSufficient = effectiveStock - totalRequired >= 0;

  const updateNode = useCallback(
    (patch) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...patch } } : node
        )
      );
    },
    [id, setNodes]
  );

  useEffect(() => {
    updateNode({
      currentStock: finalStock,
      reservedStock: state.reservedStock,
      unit: state.unit,
      status,
      totalRequired,
    });
  }, [state, totalRequired]);

  return (
    <div className=" bg-slate-500 rounded-3xl shadow-2xl ">
      <div className="flex">
        <h1 className="p-4 text-xl font-semibold text-white ">Inventory</h1>
        <DuplicateNode NodeId={id} />
      </div>
      <div className="absolute right-4 top-4">
        <DeleteButton nodeId={id} />
      </div>
      <div className="p-4 bg-gray-50 rounded-2xl shadow-lg flex flex-col gap-3">
        <div className="flex flex-col">
          <label>Amount:</label>
          <div className="flex">
            <input
              type="number"
              value={state.currentStock}
              onChange={(e) =>
                dispatch({ currentStock: Number(e.target.value) })
              }
              className="nodrag border-2 rounded-[5px] w-30"
            />

            <select
              value={state.unit}
              onChange={(e) => dispatch({ unit: e.target.value })}
              className="nodrag border-2 rounded-[5px] font-bold"
            >
              {Object.entries(UNITS).map(([key, obj]) => (
                <option key={key} value={key}>
                  {obj.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col p-1">
            <label>Reserve %</label>
            <input
              type="number"
              value={state.reservedStock}
              onChange={(e) =>
                dispatch({ reservedStock: Number(e.target.value) })
              }
              className="nodrag border-2 rounded-[5px] w-[70px]"
            />
          </div>
          <div className="flex flex-col p-1">
            <label>Status: </label>
            <label
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-white
    ${isSufficient ? "bg-green-500" : "bg-red-500"}
  `}
            >
              {isSufficient ? (
                <>
                  <CircleCheckBig className="h-4 w-4" />
                  Sufficient
                </>
              ) : (
                <>
                  <CircleAlert className="h-4 w-4" />
                  Insufficient
                </>
              )}
            </label>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "none",
          border: "none",
          width: "1em",
          height: "1em",
        }}
      >
        <CircleChevronRight className="bg-gray-50  rounded-full hover:bg-gray-300 hover:scale-105" />
      </Handle>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "none",
          border: "none",
          width: "1em",
          height: "1em",
          left: "-.5em",
        }}
      >
        <CircleChevronRight className="bg-gray-50  rounded-full hover:bg-gray-300 hover:scale-105" />
      </Handle>
    </div>
  );
}

export default React.memo(Inventory);
