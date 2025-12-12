import { useEffect, useState } from "react";
import {
  Position,
  Handle,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import DeleteButton from "./deleteNode";
import { ChevronDown, CircleChevronRight } from "lucide-react";
import DuplicateNode from "./duplicateNode";

export default function FinalProduct({ id, data }) {
  const connections = useNodeConnections(id);
  const [toggle, setToggle] = useState(false);

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
    <div className=" bg-lime-500 rounded-3xl shadow-2xl ">
      <div className="flex">
        <h1 className="p-4 text-xl font-semibold text-white ">Final Product</h1>
        <DuplicateNode NodeId={id} />
      </div>
      <div className="absolute right-4 top-4">
        <DeleteButton />
      </div>

      <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-3">
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

          <div className="flex">
            <div className="flex flex-col w-full mr-2">
              <label className="text-sm font-medium">Quantity Produced</label>
              <input
                type="number"
                value={data.quantityProduced || 0}
                disabled
                className="w-full border p-1 rounded bg-gray-100"
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
          <div
            className={`
    transition-all duration-600 overflow-hidden
    ${toggle ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
  `}
          >
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
                  updateNodeData(id, {
                    ...data,
                    deliveryLocation: e.target.value,
                  })
                }
                className="w-full border p-1 rounded"
              />
            </div>
          </div>

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
      </div>
    </div>
  );
}
