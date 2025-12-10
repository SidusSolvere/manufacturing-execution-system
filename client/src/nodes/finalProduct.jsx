import { useEffect } from "react";
import {
  Position,
  Handle,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

export default function FinalProduct({ id, data }) {
  const connections = useNodeConnections(id);

  const sourceId = connections.find((c) => c.target === id)?.source;

  const assemblyData = useNodesData(sourceId);

  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (!assemblyData || !assemblyData.data) {
      updateNodeData(id, { quantityProduced: 0 });
      return;
    }

    const quantityProduced = Number(assemblyData.data.quantityProduced || 0);

    updateNodeData(id, {
      ...data,
      quantityProduced,
    });
  }, [assemblyData]);

  return (
    <div className="p-4 bg-white border rounded shadow w-[320px]">
      <h2 className="text-lg font-semibold mb-3">Final Product</h2>

      <div className="flex flex-col gap-2">
        <div>
          <label className="text-sm font-medium">Item Name</label>
          <input
            type="text"
            value={data.itemName || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, itemName: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Quantity Produced</label>
          <input
            type="number"
            value={data.quantityProduced || 0}
            disabled
            className="w-full border p-1 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Batch Number</label>
          <input
            type="text"
            value={data.batchNumber || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, batchNumber: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Packaging Info</label>
          <input
            type="text"
            value={data.packagingInfo || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, packagingInfo: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">QC Status</label>
          <input
            type="text"
            value={data.qcStatus || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, qcStatus: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Dispatch Date</label>
          <input
            type="date"
            value={data.dispatchDate || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, dispatchDate: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Delivery Location</label>
          <input
            type="text"
            value={data.deliveryLocation || ""}
            onChange={(e) =>
              updateNodeData(id, { ...data, deliveryLocation: e.target.value })
            }
            className="w-full border p-1 rounded"
          />
        </div>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
