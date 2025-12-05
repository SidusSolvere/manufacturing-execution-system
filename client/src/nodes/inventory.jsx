import { useCallback } from "react";
import { Position, Handle } from '@xyflow/react';

function Inventory(props){


  const onUpdate = useCallback((evt) => {
  console.log(evt.target.value);
}, []);

  return(
  <>
    <div className="p-4 bg-white rounded-2xl">
      <div className="flex flex-col">
        <label htmlFor="text">Inventory:</label>
        <input id="text" name="text" onChange={onUpdate} className="nodrag border-2 border-solid rounded-[5px]" />
         <Handle type="source" position={Position.Right} /> {/*this is how you impliment a handle, in case if you want multiple handles of the same type then you need an id tag, eventually we need to make a user customizable node which can have n number of handles so */}
      <Handle type="target" position={Position.Left} />
      </div>
  </div>


  </>
  );
}

export default Inventory