import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useReducer, useCallback } from "react";
import DeleteButton from "./deleteNode";

function ProductionOrder({ id, data }) {
  const { setNodes } = useReactFlow();

  function reducer(state, action) {
    switch (action.type) {
      case "updateField":
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  }

  const initialState = {
    itemName: data?.itemName || "",
    quantity: data?.quantity || 1,
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    customerName: data?.customerName || "",
    status: data?.status || "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateNodeData = useCallback(
    (field, value) => {
      dispatch({ type: "updateField", field, value });

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, [field]: value } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div className="p-4 bg-gray-50 rounded-3xl shadow-2xl ">

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>Item Name:</label>
          <input
            type="text"
            value={state.itemName}
            onChange={(e) => updateNodeData("itemName", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>

        <div className="flex flex-col">
          <label>Quantity:</label>
          <input
            type="number"
            value={state.quantity}
            onChange={(e) => updateNodeData("quantity", Number(e.target.value))}
            className="nodrag m-2 border rounded p-1 w-20"
          />
        </div>
        <div>
          <DeleteButton/>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>Start Date:</label>
          <input
            type="date"
            value={state.startDate}
            onChange={(e) => updateNodeData("startDate", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>

        <div className="flex flex-col">
          <label>End Date:</label>
          <input
            type="date"
            value={state.endDate}
            onChange={(e) => updateNodeData("endDate", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>Customer:</label>
          <input
            type="text"
            value={state.customerName}
            onChange={(e) => updateNodeData("customerName", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>

        <div className="flex flex-col">
          <label>Status:</label>
          <input
            type="text"
            value={state.status}
            onChange={(e) => updateNodeData("status", e.target.value)}
            className="nodrag m-2 border rounded p-1"
          />
        </div>
      </div>

      <Handle type="source" className="scale-200" position={Position.Right} />
    </div>
  );
}

export default ProductionOrder;
