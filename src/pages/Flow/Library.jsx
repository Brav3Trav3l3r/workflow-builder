import { X } from "lucide-react";
import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import useStore from "../../store/flowStore";
import useWorkflowStore from "../../store/workflows";
import styles from "./styles/Library.module.css";

export default function Library({ setLibraryIsOpen }) {
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const workflows = useWorkflowStore((state) => state.workflows);
  const { setViewport } = useReactFlow();

  const loadFLow = useCallback(
    (id) => {
      const restoreFlow = async () => {
        const flow = workflows.find((flow) => flow.id === id);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      };

      restoreFlow();
    },
    [setNodes, setViewport, setEdges, workflows]
  );

  return (
    <div className={styles.library}>
      <div className={styles.heading}>
        <p>Library</p>
        <X size={36} onClick={() => setLibraryIsOpen(false)} />
      </div>

      <div className={styles.flows}>
        {workflows?.map((flow) => (
          <div
            className={styles.flow}
            onClick={() => loadFLow(flow.id)}
            key={flow.id}
          >
            {flow.name}
          </div>
        ))}
      </div>
    </div>
  );
}
