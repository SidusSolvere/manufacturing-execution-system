import { useState, useCallback, useRef, useEffect } from "react";
import Inventory from "../../nodes/inventory";
import ProductionOrder from "../../nodes/productionOrder";
import Parts from "../../nodes/parts";
import Processing from "../../nodes/processing";
import Assembly from "../../nodes/assembly";
import FinalProduct from "../../nodes/finalProduct";
import { backgroundColor } from "./backgroundTheme/background";
import { color } from "./backgroundTheme/color";
import { variant } from "./backgroundTheme/variant";
import Ribbon from "./ribbon";
import { Maximize2, Minimize2 } from "lucide-react";
import AutoLayoutButton from "../../nodes/autoLayout";
// import { getNodes, setNodesFromProject, updateNodes,} from "./nodes";
// import { getEdges, setEdgesFromProject, updateEdges, } from "./edges";
import { fetchProjects, fetchProjectById, saveProject, } from "../../API/projectApi";
import { connectSocket, disconnectSocket } from "../../API/socket";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomEdge from "../../nodes/customEdge";
import useSession from "../../hooks/useSession";

const nodeTypes = {
  inventory: Inventory,
  productionOrder: ProductionOrder,
  parts: Parts,
  processing: Processing,
  assembly: Assembly,
  finalProduct: FinalProduct,
};

const edgeTypes = { "custom-edge": CustomEdge };

export default function WorkPlace() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const isRemoteUpdateRef = useRef(false);

  const [isCollaborative, setIsCollaborative] = useState(false);
  const socketRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const [bgColorKey, setBgColorKey] = useState("white");
  const [colorKey, setColorKey] = useState("dark");
  const [variantKey, setVariantKey] = useState("dots");
  const { user, loading } = useSession();
  console.log("User in WorkPlace:", user);
  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);


  const handleSelectProject = async (projectId) => {
    if (!projectId) {
      setNodes([]);
      setEdges([]);
      setActiveProjectId(null);
      return;
    }
    const project = await fetchProjectById(projectId);
    setNodes(structuredClone(project.nodes));
    setEdges(structuredClone(project.edges));
    setActiveProjectId(project._id);
  };
  useEffect(() => {
    if (
      !isCollaborative ||
      !socketRef.current ||
      !activeProjectId ||
      isRemoteUpdateRef.current
    ) {
      isRemoteUpdateRef.current = false; 
      return;
    }

    socketRef.current.emit("nodes:update", {
      projectId: activeProjectId,
      nodes,
    });
  }, [nodes, isCollaborative, activeProjectId]);

  useEffect(() => {
    if (
      !isCollaborative ||
      !socketRef.current ||
      !activeProjectId ||
      isRemoteUpdateRef.current
    ) {
      isRemoteUpdateRef.current = false;
      return;
    }

    socketRef.current.emit("edges:update", {
      projectId: activeProjectId,
      edges,
    });
  }, [edges, isCollaborative, activeProjectId]);

  useEffect(() => {
    if (!isCollaborative || !activeProjectId) {
      console.log("Not collaborative or no active project, skipping socket connection");
      return;
    }
    socketRef.current = connectSocket();
    socketRef.current.emit("join-project", activeProjectId);

    socketRef.current.on("nodes:update", (nodes) => {
      console.log("Received nodes update via socket:", nodes);
      isRemoteUpdateRef.current = true;
      setNodes(structuredClone(nodes));
    });

    socketRef.current.on("edges:update", (edges) => {
      console.log("Received edges update via socket:", edges);
      isRemoteUpdateRef.current = true;
      setEdges(structuredClone(edges));
    });

    return () => {
      socketRef.current.emit("leave-project", activeProjectId);
      disconnectSocket();
    };
  }, [isCollaborative, activeProjectId]);
  // const onNodesChange = useCallback(
  //   (changes) => {
  //     setNodes((prev) => {
  //       const updated = applyNodeChanges(changes, prev);

  //       if (isCollaborative && socketRef.current) {
  //         socketRef.current.emit("nodes:update", {
  //           projectId: activeProjectId,
  //           nodes: updated,
  //         });
  //       }

  //       return updated;
  //     });
  //   },
  //   [isCollaborative, activeProjectId]
  // );


  // const onEdgesChange = useCallback(
  //   (changes) => {
  //     setEdges((prev) => {
  //       const updated = applyEdgeChanges(changes, prev);

  //       if (isCollaborative && socketRef.current) {
  //         socketRef.current.emit("edges:update", {
  //           projectId: activeProjectId,
  //           edges: updated,
  //         });
  //       }

  //       return updated;
  //     });
  //   },
  //   [isCollaborative, activeProjectId]
  // );


  // const onConnect = useCallback(
  //   (params) => {
  //     setEdges((prev) => {
  //       const updated = addEdge(params, prev);

  //       if (isCollaborative && socketRef.current) {
  //         socketRef.current.emit("edges:update", {
  //           projectId: activeProjectId,
  //           edges: updated,
  //         });
  //       }

  //       return updated;
  //     });
  //   },
  //   [isCollaborative, activeProjectId]
  // );

  const onConnect = useCallback(
    (params) => {
      setEdges((prev) => {
        const updated = addEdge(params, prev);

        if (isCollaborative && socketRef.current && activeProjectId) {
          socketRef.current.emit("edges:update", {
            projectId: activeProjectId,
            edges: updated,
          });
        }
        console.log("emmmited change via socket:");

        return updated;
      });
    },
    [isCollaborative, activeProjectId]
  );


  const handleSaveProject = async () => {
  if (!activeProjectId) {
    console.log('no active project to save');
    return;
  }

  await saveProject({
    projectId: activeProjectId,
    nodes,
    edges,
  });
  console.log("current nodes and edges that got saved in the DB",nodes,edges)
  alert("Project saved");
};


  const fullscreenRef = useRef(null);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const handler = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleFullscreen = () => {
    const el = fullscreenRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  };


    if (loading) return <div>Loading...</div>;

if (!user || !user.isApproved) {
  return <div className="p-4">Awaiting approval</div>;
}

if (["ADMIN", "SUPER_ADMIN"].includes(user.companyRole)) {
  return <div className="p-4">Admins cannot access workspace</div>;
}

  return (
    <div ref={fullscreenRef} className="h-full w-full relative">
      <ReactFlow
        key={activeProjectId}
        onlyRenderVisibleElements={true}
        maxZoom={2}
        minZoom={0.1}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        onNodeDragStop={() => {
          if (isCollaborative && socketRef.current && activeProjectId) {
            socketRef.current.emit("nodes:update", {
              projectId: activeProjectId,
              nodes,
            });
          }
        }}
      >
        <MiniMap nodeBorderRadius={50}
          nodeColor={(node) => {
            switch (node.type) {
              case "productionOrder":
                return "#3b82f6";
              case "inventory":
                return "#64748b";
              case "parts":
                return "#6366f1";
              case "processing":
                return "#10b981";
              case "assembly":
                return "#f59e0b";
              case "finalProduct":
                return "#84cc16"
              default:
                return "blue";
            }
          }}></MiniMap>
        <Panel position="top-left">
          <Ribbon
            bgColorKey={bgColorKey}
            setBgColorKey={setBgColorKey}
            colorKey={colorKey}
            setColorKey={setColorKey}
            variantKey={variantKey}
            setVariantKey={setVariantKey}
            projects={projects}
            activeProjectId={activeProjectId}
            onSelectProject={handleSelectProject}
            onSaveProject={handleSaveProject}
            isCollaborative={isCollaborative}
            onToggleCollaborative={setIsCollaborative}
            socketRef={socketRef}

          />
        </Panel>

        <Background
          color={color[colorKey]}
          bgColor={backgroundColor[bgColorKey]}
          variant={variant[variantKey]}
        />

        <Controls className="scale-90">
          {!isFull && (
            <button onClick={handleFullscreen} className="react-flow__controls-button">
              <Maximize2 />
            </button>
          )}
          {isFull && (
            <button onClick={handleExitFullscreen} className="react-flow__controls-button">
              <Minimize2 />
            </button>
          )}
          <AutoLayoutButton />



        </Controls>
      </ReactFlow>
    </div>
  );
}
