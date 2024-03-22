import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Flow from "./pages/Flow";
import Dashboard from "./pages/Dashboard";
import { ReactFlowProvider } from "reactflow";

const router = createBrowserRouter([
  { path: "/", element: <Flow /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default function App() {
  return (
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  );
}
