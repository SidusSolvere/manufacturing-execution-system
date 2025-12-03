import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function WorkPlace() {
  return (
    <div className="h-full w-full">
  <ReactFlow>
    <Background />
    <Controls />
  </ReactFlow>
</div>

  );
}
