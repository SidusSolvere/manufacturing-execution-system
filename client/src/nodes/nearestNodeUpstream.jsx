import { useMemo } from "react";
import { useNodes, useEdges } from "@xyflow/react";

export function useNearestUpstream(startIds, targetType) {
  const nodes = useNodes();
  const edges = useEdges();

  return useMemo(() => {
    if (!Array.isArray(startIds)) return [];

    const findForOne = (startId) => {
      let currentId = startId;
      let hops = 0;

      while (true) {
        const currentNode = nodes.find((n) => n.id === currentId);
        if (!currentNode) break;

        if (currentNode.type === targetType) {
          return { node: currentNode, data: currentNode.data, hops };
        }

        const conn = edges.find((e) => e.target === currentId);
        if (!conn) break;

        currentId = conn.source;
        hops++;
      }

      return { node: null, data: null, hops: 0 };
    };

    return startIds.map((id) => findForOne(id));
  }, [startIds, targetType, nodes, edges]);
}
