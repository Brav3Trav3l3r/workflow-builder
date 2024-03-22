import { Link } from "react-router-dom";
import { Panel } from "reactflow";
import styles from "./styles/Navigation.module.css";

export default function Navigation() {
  return (
    <div>
      <Panel position="top-left" className={styles.panel}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
      </Panel>
    </div>
  );
}
