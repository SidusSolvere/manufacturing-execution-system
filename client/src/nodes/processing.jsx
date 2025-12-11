import {
  Position,
  Handle,
  useReactFlow,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useReducer,useState } from "react";
import DeleteButton from "./deleteNode";
import { ChevronDown, CircleChevronRight } from "lucide-react";


function Processing({ id, data }) {
  const { setNodes } = useReactFlow();
  const [toggle,setToggle]=useState(false);
  

  const initialState = {
    processName: data?.processName || "",
    machineId: data?.machineId || "",
    rateUnitsPerHour: data?.rateUnitsPerHour || 0,
    inputRate: data?.inputRate || 0,
    setupTimeMin: data?.setupTimeMin || 60,
    operatorCount: data?.operatorCount || 1,
    operatorSkill: data?.operatorSkill || "",
    status: data?.status || "Null",
    hoursPerDay: data?.hoursPerDay || 8,
    daysPerWeek: data?.daysPerWeek || 5,
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
    <div className=" bg-blue-500 rounded-3xl shadow-2xl ">
       < div>
                <h1 className="p-4 text-xl font-semibold  text-white rounded-t-3xl">
                  Processing
                </h1>
              </div>
              <div className="absolute right-4 top-4">
                <DeleteButton />
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-3">
          <div className="flex flex-col">
            <label>Process Name:</label>
            <input
              type="text"
              value={state.processName}
              onChange={onChange("processName")}
              className="nodrag border-2 rounded p-1"
            />
            
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
          <div className="flex">
            <div>
                          <label>Status:<div className="rounded-full bg-gray-400 px-3 text-white">{state.status}</div></label>
                          </div>
                          <div><button
  onClick={() => setToggle(!toggle)}
  className={` transition-transform duration-600 
    ${toggle ? "rotate-180" : "rotate-0"}
  `}
>
  <ChevronDown />
</button></div>
</div>
<div
  className={`
    transition-all duration-600 overflow-hidden
    ${toggle ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
  `}
>
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
            <label>Total Time (hours):</label>
            <label className="nodrag border-2 rounded p-1 bg-gray-100">
              {state.time}
            </label>
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
    </>
  );
}
export default Processing;
