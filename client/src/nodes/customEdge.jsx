import {
  BaseEdge,
  EdgeLabelRenderer,
  
  useReactFlow,
  getBezierPath
} from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
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
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan px-1.5 rounded-full border-2 solid border-gray-300 bg-gray-800/60 text-white "
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          X
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
