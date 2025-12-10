import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useReducer } from "react";
import DeleteButton from "./deleteNode";

function Processing({ id, data }) {
  const { setNodes } = useReactFlow();

  const initialState = {
    processName: data?.processName || "",
    machineId: data?.machineId || "",
    rateUnitsPerHour: data?.rateUnitsPerHour || 0,
    inputRate: data?.inputRate || 0,
    setupTimeMin: data?.setupTimeMin || 0,
    operatorCount: data?.operatorCount || 0,
    operatorSkill: data?.operatorSkill || "",
    status: data?.status || "",
    hoursPerDay: data?.hoursPerDay || 0,
    daysPerWeek: data?.daysPerWeek || 0,
    machineCostPerHour: data?.machineCostPerHour || 0,
    laborCostPerHour: data?.laborCostPerHour || 0,
    totalProcessingCost: data?.totalProcessingCost || 0,
    time: data?.time || "",
    total: data?.total || 0,
    totalTimeHours: data?.totalTimeHours || 0,
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
      "rateUnitsPerHour",
      "setupTimeMin",
      "operatorCount",
      "hoursPerDay",
      "daysPerWeek",
      "machineCostPerHour",
      "laborCostPerHour",
    ];

    const value = NumberFields.includes(field)
      ? Number(e.target.value)
      : e.target.value;

    dispatch({ [field]: value });
    updateNodeData({ [field]: value });
  };

  const connections = useNodeConnections(id);

  const sourceId = connections.find((c) => c.target === id)?.source;
  const targetId = connections.find((c) => c.source === id)?.target;
  const targetData = useNodesData(targetId);
  const sourceData = useNodesData(sourceId);
  useEffect(() => {
    if (!sourceData || sourceData.type !== "inventory") return;

    const total = sourceData.data.totalRequired;

    const rate = Number(state.rateUnitsPerHour);
    const hoursPerDay = Number(state.hoursPerDay);
    const daysPerWeek = Number(state.daysPerWeek);
    const setupMinutes = Number(state.setupTimeMin);

    if (!rate || !hoursPerDay || !daysPerWeek) return;

    let totalTimeHours = total / rate;
    totalTimeHours += setupMinutes / 60;

    const weeklyHours = hoursPerDay * daysPerWeek;
    const weeks = Math.floor(totalTimeHours / weeklyHours);

    let remainingHours = totalTimeHours - weeks * weeklyHours;

    const days = Math.floor(remainingHours / hoursPerDay);
    remainingHours -= days * hoursPerDay;

    const hours = Math.floor(remainingHours);
    const minutes = Math.round((remainingHours - hours) * 60);

    const time = `${weeks} weeks ${days} days ${hours} hours ${minutes} minutes`;

    let status = "";

    if (targetData && targetData.type === "processing") {
      const targetRate = Number(targetData.data.rateUnitsPerHour);

      if (targetRate > rate) {
        status = "Bottleneck in this node";
      }
    }

    if (status) {
      dispatch({ time, total, status, totalTimeHours });
      updateNodeData({
        ...state,
        time,
        total,
        status,
        totalTimeHours,
      });
    } else {
      dispatch({ time, total, totalTimeHours });
      updateNodeData({
        ...state,
        time,
        total,
        totalTimeHours,
      });
    }
  }, [
    state.daysPerWeek,
    state.hoursPerDay,
    state.rateUnitsPerHour,
    state.setupTimeMin,
    sourceData?.data?.totalRequired,
    targetData?.data?.rateUnitsPerHour,
  ]);

  useEffect(() => {
    if (!sourceData || sourceData.type !== "processing") return;

    const total = Number(sourceData.data.total);
    const sourceRate = Number(sourceData.data.rateUnitsPerHour);
    const nodeRate = Number(state.rateUnitsPerHour);
    const hoursPerDay = Number(state.hoursPerDay);
    const daysPerWeek = Number(state.daysPerWeek);
    const setupMinutes = Number(state.setupTimeMin);

    if (!total || !hoursPerDay || !daysPerWeek || !nodeRate) return;

    const effectiveRate = sourceRate <= nodeRate ? sourceRate : nodeRate;

    let totalTimeHours = total / effectiveRate;
    totalTimeHours += setupMinutes / 60;

    const weeklyHours = hoursPerDay * daysPerWeek;
    const weeks = Math.floor(totalTimeHours / weeklyHours);

    let remainingHours = totalTimeHours - weeks * weeklyHours;

    const days = Math.floor(remainingHours / hoursPerDay);
    remainingHours -= days * hoursPerDay;

    const hours = Math.floor(remainingHours);
    const minutes = Math.round((remainingHours - hours) * 60);

    const time = `${weeks} weeks ${days} days ${hours} hours ${minutes} minutes`;

    let status = "";
    if (sourceRate < nodeRate) status = "Bottleneck in previous node";
    else if (sourceRate > nodeRate) status = "Bottleneck in this node";

    dispatch({ time, total, status, totalTimeHours });

    updateNodeData({
      ...state,
      time,
      total,
      status,
      totalTimeHours,
    });
  }, [
    state.daysPerWeek,
    state.hoursPerDay,
    state.rateUnitsPerHour,
    state.setupTimeMin,
    sourceData?.data?.totalRequired,
  ]);

  return (
    <>
      <div>
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-3">
          <label className="text-center font-semibold">Processing</label>

          <div className="flex flex-col">
            <label>Process Name:</label>
            <input
              type="text"
              value={state.processName}
              onChange={onChange("processName")}
              className="nodrag border-2 rounded p-1"
            />
            <DeleteButton />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>Machine ID:</label>
              <input
                type="text"
                value={state.machineId}
                onChange={onChange("machineId")}
                className="nodrag border-2 rounded p-1"
              />
              <label>Status: {status}</label>
            </div>

            <div className="flex flex-col">
              <label>Rate (units/hour):</label>
              <input
                type="Number"
                value={state.rateUnitsPerHour}
                onChange={onChange("rateUnitsPerHour")}
                className="nodrag border-2 rounded p-1"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>Setup Time (min):</label>
              <input
                type="Number"
                value={state.setupTimeMin}
                onChange={onChange("setupTimeMin")}
                className="nodrag border-2 rounded p-1"
              />
            </div>

            <div className="flex flex-col">
              <label>Operator Count:</label>
              <input
                type="Number"
                value={state.operatorCount}
                onChange={onChange("operatorCount")}
                className="nodrag border-2 rounded p-1"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label>Operator Skill:</label>
            <input
              type="text"
              value={state.operatorSkill}
              onChange={onChange("operatorSkill")}
              className="nodrag border-2 rounded p-1"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>Hours per Day:</label>
              <input
                type="Number"
                value={state.hoursPerDay}
                onChange={onChange("hoursPerDay")}
                className="nodrag border-2 rounded p-1"
              />
            </div>

            <div className="flex flex-col">
              <label>Days per Week:</label>
              <input
                type="Number"
                value={state.daysPerWeek}
                onChange={onChange("daysPerWeek")}
                className="nodrag border-2 rounded p-1"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>Machine Cost (₹/hour):</label>
              <input
                type="Number"
                value={state.machineCostPerHour}
                onChange={onChange("machineCostPerHour")}
                className="nodrag border-2 rounded p-1"
              />
            </div>

            <div className="flex flex-col">
              <label>Labor Cost (₹/hour):</label>
              <input
                type="Number"
                value={state.laborCostPerHour}
                onChange={onChange("laborCostPerHour")}
                className="nodrag border-2 rounded p-1"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label>Total Processing Cost:</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.totalProcessingCost}
            </label>
          </div>
          <div className="flex flex-col">
            <label>Status:</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.status}
            </label>
          </div>

          <div className="flex flex-col">
            <label>Total Time (hours):</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.time}
            </label>
          </div>

          <Handle type="source" position={Position.Right} />
          <Handle type="target" position={Position.Left} />
        </div>
      </div>
    </>
  );
}
export default Processing;
