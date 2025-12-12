import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  getBezierPath
} from '@xyflow/react';
import { CircleX } from 'lucide-react';

export default function CustomEdge({
  id,
  sourceX, sourceY,
  targetX, targetY,
  source, target,
  selected,
}) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />

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
            onClick={() =>
              setEdges((es) => es.filter((e) => e.id !== id))
            }
          >
            <CircleX/>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
