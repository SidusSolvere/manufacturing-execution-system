import { useCallback, useState } from "react";
import { Position, Handle, useReactFlow } from "@xyflow/react";

function Inventory({ id, data }) {
  const { setNodes } = useReactFlow();// destructures set nodes from react flow to use it to update the data in nodes

  const UNITS = {
    box: { label: "Box (100 pieces)", amount: 100 },
    carton: { label: "Carton (12 Boxes)", amount: 12 * 100 },
    roll: { label: "Roll (500 meters)", amount: 500 },
    pallet: { label: "Pallet (50 Cartons)", amount: 50 * 12 * 100 },
    drum: { label: "Drum (200 Litres)", amount: 200 },
  };
  //some industry standard units used for inventory keeping

  const [quantity, setQuantity] = useState(data?.amount || "");
  const [unit, setUnit] = useState(data?.unit || "box");
  // will impliment set reducer when learnt 

  const onUpdate = useCallback(
    (evt) => {
      const newValue = Number(evt.target.value); 

      setQuantity(newValue);

      const multiplier = UNITS[unit].amount;
      const finalValue = newValue * multiplier;

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, amount: finalValue, unit } }
            : node
        )
      );
    },
    [id, setNodes, unit]
  );//since reactflow stores the nodes datat inside the nodes array we need to updat the node array from the custom node to pass amount onto other nodes when we connect them
  //so basically this updates the nodes array 

  const onUnitChange = (evt) => {
    const newUnit = evt.target.value; 
    setUnit(newUnit);

    const multiplier = UNITS[newUnit].amount;
    const finalValue = quantity * multiplier;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, amount: finalValue, unit: newUnit } }
          : node
      )
    );
  };
  // smae thing as above, to handle the case of unit change but no number change 

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col">
        <label htmlFor="text">Inventory:</label>
        <div className="flex">
          <input
            type="number"
            id="number"
            name="number"
            value={quantity} 
            onChange={onUpdate}
            className="nodrag border-2 border-solid rounded-[5px]"
          />

          <select
            value={unit} 
            onChange={onUnitChange}
            className="nodrag border-2 border-solid rounded-[5px] font-bold"
          >
            {Object.entries(UNITS).map(([key, obj]) => (
              <option key={key} value={key}>
                {obj.label}
              </option>
            ))}
          </select>
        </div>

        <Handle  type="source" position={Position.Right} style={{
          background: 'none',
          border: 'none',
          width: '1em',
          height: '1em',
          //reactflow method of making custom handlers, add later 
        }}>
          <div className="font-extrabold mx-2 text-black/50 hover:text-black">
            &gt;
          </div>

        </Handle>
        {/*handle and position are from react flow and are used to put the handles wehre the edges connect and are extruded from on custom positions, 
        In case of using multiple handles use an id tag so you can reference it later */}
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}

export default Inventory;
 