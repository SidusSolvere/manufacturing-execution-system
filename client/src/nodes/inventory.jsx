import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useCallback, useReducer, useEffect } from "react";
import DeleteButton from "./deleteNode";

const UNITS = {
  box: { label: "Box (100 pieces)", amount: 100 },
  carton: { label: "Carton (12 Boxes)", amount: 1200 },
  roll: { label: "Roll (500 meters)", amount: 500 },
  pallet: { label: "Pallet (50 Cartons)", amount: 60000 },
  drum: { label: "Drum (200 Litres)", amount: 200 },
};

const initialState = (data) => ({
  currentStock: data?.currentStock || 0,
  reservedStock: data?.reservedStock || 0,
  unit: data?.unit || "box",
  status: data?.status || "",
  total: data?.total || 0,
});

function reducer(state, action) {
  return { ...state, ...action };
}

function Inventory({ id, data }) {
  const { setNodes } = useReactFlow();
  const connections = useNodeConnections(id);
  const sourceId = connections.find((c) => c.target === id)?.source;
  const sourceNode = useNodesData(sourceId);

  const totalRequired = Number(sourceNode?.data?.totalRequired || 0);

  const [state, dispatch] = useReducer(reducer, data, initialState);

  const multiplier = UNITS[state.unit].amount;
  const finalStock = state.currentStock * multiplier;
  const effectiveStock = finalStock * (1 - state.reservedStock / 100);
  const status = effectiveStock - totalRequired >= 0 ? "Sufficient" : "Insufficient";

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
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <DeleteButton/>
      <div className="flex flex-col">
        <label>Inventory</label>

        <div className="flex gap-2">
          <input
            type="number"
            value={state.currentStock}
            onChange={(e) => dispatch({ currentStock: Number(e.target.value) })}
            className="nodrag border-2 rounded-[5px]"
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

          <label>Reserve %</label>
          <input
            type="number"
            value={state.reservedStock}
            onChange={(e) => dispatch({ reservedStock: Number(e.target.value) })}
            className="nodrag border-2 rounded-[5px] w-[70px]"
          />

          <label>Status: {status}</label>
        </div>

        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}

export default Inventory;
