import { LocalStoragePreset } from "lowdb/browser";
import { create } from "zustand";

const defaultData = { workflows: [] };
export const db = LocalStoragePreset("db", defaultData);

const useWorkflowStore = create((set, get) => ({
  workflows: db.data.workflows,
}));

export default useWorkflowStore;
