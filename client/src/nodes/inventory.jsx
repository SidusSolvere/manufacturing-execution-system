import { useCallback } from "react";

function Inventory(props){


  const onUpdate = useCallback((evt) => {
  console.log(evt.target.value);
}, []);

  return(
  <>
    <div className="p-4 m-4 bg-white rounded-2xl">
      <div className="flex flex-col">
        <label htmlFor="text">Inventory:</label>
        <input id="text" name="text" onChange={onUpdate} className="nodrag border-2 border-solid rounded-[5px]" />
      </div>
  </div>


  </>
  );
}

export default Inventory