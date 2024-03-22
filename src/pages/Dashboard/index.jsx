import { Link } from "react-router-dom";
import useWorkflowStore from "../../store/workflows";
import styles from "./styles/index.module.css";

export default function Dashboard() {
  const workflows = useWorkflowStore((state) => state.workflows);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    // console.log(e.target);
  };

  return (
    <div>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/dashboard" className={styles.link}>
        Dashboard
      </Link>
      <form onSubmit={handleSubmit}>
        <input name="file" type="file" />
        <select name="flow" id="">
          {workflows.map((workflow) => (
            <option key={workflow.id} value={workflow}>
              {workflow.name}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </form>
    </div>
  );
}
