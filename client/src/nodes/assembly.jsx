import { useReducer, useEffect, useState } from "react";
import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import DeleteButton from "./deleteNode";
import { useNearestUpstream } from "./nearestNodeUpstream";

function Assembly({ id, data }) {
  const { setNodes } = useReactFlow();

  const connections = useNodeConnections(id);
  const sourceIds = connections
    .filter((c) => c.target === id)
    .map((c) => c.source);
  const dataArray = useNodesData(sourceIds);
  const partsData = useNearestUpstream(sourceIds, "parts");
  const amounts = partsData
    .filter((p) => p && p.data)
    .map((p) => p.data.amount);

  const initialState = {
    name: data?.name || "",
    unitsPerHr: data?.unitsPerHr || 0,
    hoursPerDay: data?.hoursPerDay || 0,
    daysPerWeek: data?.daysPerWeek || 0,
    qualityCheck: data?.qualityCheck ?? false,
    qualityPass: data?.qualityPass || "",
    machineCostPerHour: data?.machineCostPerHour || 0,
    laborCostPerHour: data?.laborCostPerHour || 0,
    assemblyCost: data?.assemblyCost || 0,
  };

  function reducer(state, action) {
    return { ...state, ...action };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateNodeData = (patch) => {
    setNodes((ns) =>
      ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    );
  };

  const onChange = (field) => (e) => {
    const NumberFields = [
      "unitsPerHr",
      "hoursPerDay",
      "daysPerWeek",
      "machineCostPerHour",
      "laborCostPerHour",
      "assemblyCost",
    ];

    const value = NumberFields.includes(field)
      ? Number(e.target.value)
      : e.target.value;

    dispatch({ [field]: value });
    updateNodeData({ [field]: value });
  };

  const [rankingList, setRankingList] = useState([]);
  useEffect(() => {
    if (!dataArray || dataArray.length === 0 || !amounts) {
      setRankingList([]);
      return;
    }

    const rate = Number(state.unitsPerHr || 0);

    const results = dataArray
      .map((node, index) => {
        const totalTimeHours = Number(node.data.totalTimeHours || 0);
        const amountNeeded = Number(amounts[index] || 1);

        const unitsThisPart = rate * totalTimeHours;

        const assembliesPossible = Math.floor(unitsThisPart / amountNeeded);

        return {
          id: node.id,
          totalTimeHours,
          amountNeeded,
          unitsProduced: assembliesPossible,
        };
      })
      .sort((a, b) => a.totalTimeHours - b.totalTimeHours);

    setRankingList(results);
    updateNodeData({ rankingList: results });
  }, [
    state.unitsPerHr,
    state.hoursPerDay,
    state.daysPerWeek,
    state.machineCostPerHour,
    state.laborCostPerHour,
  ]);

  return (
    <div>
      <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-3">
        <label className="text-center font-semibold">Assembly</label>

        <div className="flex flex-col">
          <label>Name:</label>
          <input
            type="text"
            value={state.name}
            onChange={onChange("name")}
            className="nodrag border-2 rounded p-1"
          />
          <DeleteButton />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col">
            <label>Units per Hour:</label>
            <input
              type="number"
              value={state.unitsPerHr}
              onChange={onChange("unitsPerHr")}
              className="nodrag border-2 rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Hours per Day:</label>
            <input
              type="number"
              value={state.hoursPerDay}
              onChange={onChange("hoursPerDay")}
              className="nodrag border-2 rounded p-1"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Days per Week:</label>
          <input
            type="number"
            value={state.daysPerWeek}
            onChange={onChange("daysPerWeek")}
            className="nodrag border-2 rounded p-1"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col">
            <label>Machine Cost/hour:</label>
            <input
              type="number"
              value={state.machineCostPerHour}
              onChange={onChange("machineCostPerHour")}
              className="nodrag border-2 rounded p-1"
            />
          </div>

          <div className="flex flex-col">
            <label>Labor Cost/hour:</label>
            <input
              type="number"
              value={state.laborCostPerHour}
              onChange={onChange("laborCostPerHour")}
              className="nodrag border-2 rounded p-1"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Assembly Cost: {state.assemblyCost}</label>
        </div>

        <div className="flex flex-col mt-4">
          <label className="font-semibold">Upstream Node Ranking</label>
          <ul className="list-disc ml-5">
            {rankingList.map((entry, idx) => (
              <li key={entry.id}>
                <span className="font-bold">
                  {idx + 1}. Node {entry.id}
                </span>{" "}
                — {entry.totalTimeHours} hrs —{" "}
                <span className="text-blue-600">
                  {entry.unitsProduced} units
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}

export default Assembly;
