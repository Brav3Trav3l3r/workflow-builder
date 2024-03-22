import styles from "./styles/Input.module.css";

export default function Input({ value, onChange }) {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
}
