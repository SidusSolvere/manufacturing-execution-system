import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useReducer, useState } from "react";
import DeleteButton from "./deleteNode";
import { ChevronDown, CircleChevronRight } from "lucide-react";

function Parts({ id, data }) {
  const { setNodes } = useReactFlow();
  const [toggle, setToggle] = useState(false);

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
    <div className=" bg-indigo-500 rounded-3xl shadow-2xl ">
      <div>
        <h1 className="p-4 text-xl font-semibold  text-white rounded-t-3xl">
          Parts
        </h1>
      </div>
      <div className="absolute right-4 top-4">
        <DeleteButton />
      </div>
      <div className="p-4 bg-gray-50 rounded-2xl shadow-lg flex flex-col gap-3">

        <div className="flex">
          <div className="flex flex-col w-full pr-2">
            <label>Name:</label>
            <input
              type="text"
              value={state.name}
              onChange={onChange("name")}
              className="nodrag  border rounded p-1"
            />
          </div>
          <button
            onClick={() => setToggle(!toggle)}
            className={` transition-transform duration-600 
    ${toggle ? "rotate-180" : "rotate-0"}
  `}
          >
            <ChevronDown />
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col w-full">
            <label>Amount:</label>
            <input
              type="number"
              value={state.amount}
              onChange={onChange("amount")}
              className="nodrag  border rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Total:</label>
            <label className="nodrag  border rounded p-1 bg-gray-100">
              {state.totalRequired}
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col w-full">
            <label>Unit Cost:</label>
            <input
              type="number"
              value={state.unitCost}
              onChange={onChange("unitCost")}
              className="nodrag  border rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Total:</label>
            <label className="nodrag  border rounded p-1 bg-gray-100">
              {state.totalCost}
            </label>
          </div>
        </div>
        <div
  className={`
    transition-all duration-600 overflow-hidden
    ${toggle ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
  `}
>
<div className="flex flex-col">
        <label>PN:</label>
        <input
          type="text"
          value={state.pn}
          onChange={onChange("pn")}
          className="nodrag  border rounded p-1"
        />
</div>
<div className="flex flex-col">

        <label>SKU:</label>
        <input
          type="text"
          value={state.sku}
          onChange={onChange("sku")}
          className="nodrag  border rounded p-1"
        />
</div>
</div>


        <Handle type="source" position={Position.Right} style={{
          background: 'none',
          border: 'none',
          width: '1em',
          height: '1em',
          
        }} >
        <CircleChevronRight className="bg-gray-50  rounded-full hover:bg-gray-300 hover:scale-105"/>
      </Handle>
        <Handle type="target" position={Position.Left} style={{
          background: 'none',
          border: 'none',
          width: '1em',
          height: '1em',
                    left:'-.5em'

          
        }} >
        <CircleChevronRight className="bg-gray-50  rounded-full hover:bg-gray-300 hover:scale-105"/>
      </Handle>
      </div>
    </div>
  );
}

export default Parts;
