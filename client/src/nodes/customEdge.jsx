import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  getBezierPath
} from '@xyflow/react';
import { CircleX } from 'lucide-react';
import React from "react";
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onDelete = React.useCallback(() => {
    setEdges((es) => es.filter((e) => e.id !== id));
  }, [id, setEdges]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeWidth: 4 }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <button
            className="nodrag nopan text-white bg-gray-400 rounded-full hover:scale-110 hover:bg-gray-500"
            onClick={onDelete}
          >
            <CircleX />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default React.memo(CustomEdge);
