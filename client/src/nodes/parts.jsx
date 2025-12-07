import {
  Position,
  Handle,
  useReactFlow,
  useNodes,
  useEdges,
} from "@xyflow/react";
import { useCallback, useState, useEffect } from "react";

function Parts({ id, data }) {
  const { setNodes } = useReactFlow();
  const nodes = useNodes(); // are used in dependency arry to re render the componet when any of the other nodes are changed, causes a lot of unnecessary re renders so need to filter out stuff in the depenedncy array later
  const edges = useEdges();
  const [quantity, setQuantity] = useState(data?.amount || 0);
  const [pn, setPN] = useState(data?.pn || ""); //product number as uinque id for the produict
  const [sku, setSKU] = useState(data?.sku || ""); //sku for warehouse intergration later
  const [name, setName] = useState(data?.name || ""); //name of part
  const [total, setTotal] = useState(0); //total is production order * parts quantity
  const onUpdateQuantity = useCallback(
    (evt) => {
      const newValue = Number(evt.target.value);
      setQuantity(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, amount: newValue } }
            : node
        )
      );
    },
    [id, setNodes]
  );
  const onUpdatePN = useCallback(
    (evt) => {
      const newValue = evt.target.value;
      setPN(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, pn: newValue } }
            : node
        )
      );
    },
    [id, setNodes]
  );
  const onUpdateSKU = useCallback(
    (evt) => {
      const newValue = evt.target.value;
      setSKU(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, sku: newValue } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  const onUpdateName = useCallback(
    (evt) => {
      const newValue = evt.target.value;
      setName(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, name: newValue } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  useEffect(() => {
    //used here to re render whenever there is a change so total value will always be updated and is also connected to the production order node
    const connectedEdge = edges.find((edge) => edge.target === id); //find production order edge
    if (!connectedEdge) {
      setTotal(0);
      return;
    }

    const sourceNode = nodes.find((node) => node.id === connectedEdge.source); //find production order node

    if (sourceNode.type !== "productionOrder") {
      //if not connected to PO node then gives a warning
      setTotal(0);
      alert("not connected to Production order");
      return;
    }
    const poQuantity = Number(sourceNode.data.quantity || 0);
    setTotal(quantity * poQuantity);
  }, [quantity, nodes, edges, id]); //dependency array for updates
  return (
    <div className="">
      <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col">
        <label className="text-center">Parts</label>
        <div className="flex flex-col">
          <label>Name: </label>
          <input
          type="text"
          value={name}
          onChange={onUpdateName}
          className="nodrag border-2 rounded p-1"
        />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={onUpdateQuantity}
              className="nodrag border-2 border-solid rounded-[5px] p-1"
            />
          </div>
          <div className="flex flex-col">
            <label>Total Required:</label>
            <label className="nodrag border-2 rounded p-1">{total}</label>
          </div>
        </div>

        <label>PN:</label>
        <input
          type="text"
          value={pn}
          onChange={onUpdatePN}
          className="nodrag border-2 rounded p-1"
        />

        <label>SKU:</label>
        <input
          type="text"
          value={sku}
          onChange={onUpdateSKU}
          className="nodrag border-2 rounded p-1"
        />

        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}

export default Parts;
