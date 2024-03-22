import { BookOpen, Save, X } from "lucide-react";
import { Panel } from "reactflow";
import styles from "./styles/Selector.module.css";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { Dialog } from "@headlessui/react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Library from "./Library";
import { db } from "../../store/workflows";

export default function ActionMenus({ reactFlowInstance }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Untitled");
  const [libraryIsOpen, setLibraryIsOpen] = useState(false);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      db.update(({ workflows }) =>
        workflows.push({ ...flow, name, id: uuid() })
      );
    }
  }, [reactFlowInstance, name]);

  return (
    <Panel position="top-right" className={styles.flowPanel}>
      <div className={styles.menu}>
        <Save size={36} onClick={() => setIsOpen(true)} />
        <BookOpen size={36} onClick={() => setLibraryIsOpen(true)} />
      </div>
      {isOpen && (
        <Dialog
          className={styles.dialog}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Panel className={styles.panel}>
            <p>Save your workflow</p>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className={styles.actions}>
              <Button
                onClick={() => {
                  onSave();
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

      {libraryIsOpen && <Library setLibraryIsOpen={setLibraryIsOpen} />}
    </Panel>
  );
}
