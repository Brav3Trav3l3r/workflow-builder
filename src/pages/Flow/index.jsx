import { useCallback, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import "reactflow/dist/style.css";
import useStore from "../../store/flowStore";
import Sidebar from "./NodeSelector";
import Selector from "./ActionMenus";
import Navigation from "./Navigation";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Flow() {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const setNodes = useStore((state) => state.setNodes);

  // if (reactFlowInstance) {
  //   console.log(reactFlowInstance.toObject());
  // }

  // DRAG and DROP
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}`.toUpperCase() },
      };

      setNodes(nodes.concat(newNode));
    },
    [reactFlowInstance, setNodes, nodes]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Navigation />
      <Sidebar />
      <Selector reactFlowInstance={reactFlowInstance} />
    </div>
  );
}
