// you can copy this template for most nodes
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";

function ProductionOrder({ id, data }) {
  const { setNodes } = useReactFlow();

  const [name, setName] = useState(data?.name || "");
  const [quantity, setQuantity] = useState(data?.quantity || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [endDate, setEndDate] = useState(data.endDate || "");

  const onUpdate = useCallback(
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
  const onQuantityUpdate = useCallback(
    (evt) => {
      const newValue = evt.target.value;
      setQuantity(newValue);

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, quantity: newValue } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  const onStartDateUpdate = useCallback(
    (evt)=>{
      const newValue=evt.target.value;
      setStartDate(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, startDate: newValue } }
            : node
        )
      );
    },[id,setNodes]
  );
  const onEndDateUpdate = useCallback(
    (evt)=>{
      const newValue=evt.target.value;
      setEndDate(newValue);
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, endDate: newValue } }
            : node
        )
      );
    },[id,setNodes]
  );

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <div className="flex">
      <div className="flex flex-col">
        <label htmlFor="text">Production Order:</label>
          <input
            type="text"
            id="text"
            value={name}
            onChange={onUpdate}
            className="nodrag m-2 border-2 border-solid rounded-[5px]"
          />
                            </div>


          <div className="flex flex-col">
          <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={onQuantityUpdate}
              placeholder="Quantity"
              className="nodrag m-2 border-2 border-solid rounded-[5px] w-20
            "
            />
            </div>
</div>
<div className="flex">
      <div className="flex flex-col">
            <label htmlFor="startDate">Start: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={onStartDateUpdate}
              className="nodrag m-2 border-2 border-solid rounded-[5px]
            "
            />
            </div>
                  <div className="flex flex-col">

            <label htmlFor="endDate">End: </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={onEndDateUpdate}
              className="nodrag m-2 border-2 border-solid rounded-[5px] 
            "
            />
                        </div>

            </div>
      
       
        <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default ProductionOrder;
