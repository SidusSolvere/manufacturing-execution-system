import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useReducer } from "react";
import DeleteButton from "./deleteNode";

function Parts({ id, data }) {
  const { setNodes } = useReactFlow();

  const connections = useNodeConnections(id);

  const sourceId = connections.find((c) => c.target === id)?.source;

  const sourceData = useNodesData(sourceId);

  const poAmount = Number(sourceData?.data?.quantity || 0);

  const initial = {
    pn: data?.pn || "",
    amount: data?.amount || 0,
    totalRequired: data?.totalRequired || 0,
    sku: data?.sku || "",
    unitCost: data?.unitCost || 0,
    totalCost: data?.totalCost || 0,
    name: data?.name || "",
  };

  function reducer(state, action) {
    return { ...state, ...action };
  }

  const [state, dispatch] = useReducer(reducer, initial);

  const updateNodeData = (patch) => {
    setNodes((ns) =>
      ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    );
  };

  useEffect(() => {
    const totalRequired = Number(state.amount) * poAmount;
    const totalCost = totalRequired * Number(state.unitCost);

    dispatch({ totalRequired, totalCost });

    updateNodeData({
      ...state,
      totalRequired,
      totalCost,
    });
  }, [state.amount, state.unitCost, poAmount]);

  const onChange = (field) => (e) => {
    const value =
      field === "amount" || field === "unitCost"
        ? Number(e.target.value)
        : e.target.value;

    dispatch({ [field]: value });
    updateNodeData({ [field]: value });
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-3">
        <label className="text-center font-semibold">Parts</label>

        <div className="flex flex-col">
          <label>Name:</label>
          <input
            type="text"
            value={state.name}
            onChange={onChange("name")}
            className="nodrag border-2 rounded p-1"
          />
          <DeleteButton/>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col">
            <label>Amount:</label>
            <input
              type="number"
              value={state.amount}
              onChange={onChange("amount")}
              className="nodrag border-2 rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Total Required:</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.totalRequired}
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col">
            <label>Unit Cost:</label>
            <input
              type="number"
              value={state.unitCost}
              onChange={onChange("unitCost")}
              className="nodrag border-2 rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Total Cost:</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.totalCost}
            </label>
          </div>
        </div>

        <label>PN:</label>
        <input
          type="text"
          value={state.pn}
          onChange={onChange("pn")}
          className="nodrag border-2 rounded p-1"
        />

        <label>SKU:</label>
        <input
          type="text"
          value={state.sku}
          onChange={onChange("sku")}
          className="nodrag border-2 rounded p-1"
        />

        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}

export default Parts;
