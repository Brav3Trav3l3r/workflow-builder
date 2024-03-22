import { Panel } from "reactflow";
import styles from "./styles/Sidebar.module.css";

export default function NodeSelector() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel position="top-center" className={styles.panel}>
      <aside>
        <div className={styles.nodes}>
          <div
            className={`${styles.node} ${styles.filter}`}
            onDragStart={(event) => onDragStart(event, "filter")}
            draggable
          >
            Filter
          </div>
          <div
            className={`${styles.node} ${styles.default}`}
            onDragStart={(event) => onDragStart(event, "wait")}
            draggable
          >
            Wait
          </div>
          <div
            className={`${styles.node} ${styles.convert}`}
            onDragStart={(event) => onDragStart(event, "convert")}
            draggable
          >
            Convert data
          </div>
          <div
            className={`${styles.node} ${styles.post}`}
            onDragStart={(event) => onDragStart(event, "post")}
            draggable
          >
            Send POST
          </div>
        </div>
      </aside>
    </Panel>
  );
}
